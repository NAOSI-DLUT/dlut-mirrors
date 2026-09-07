import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCernet, redirectTarget, mirrorMeta } from '../src/lib/mirrors.ts';
import { loadCernet } from '../src/lib/server/cernet.ts';
const upstream = {
  mirrors: [
    { cname: 'ubuntu', url: '/ubuntu', status: 'U' },
    { cname: 'git/test.git', url: '/git/test.git', status: 'U' },
  ],
};
const repos = parseCernet(upstream);
const now = Date.parse('2026-09-07T00:00:00Z');
function cacheAt(age: number) {
  let saved = Response.json({
    mirrors: repos,
    fetchedAt: new Date(now - age).toISOString(),
    sourceUpdatedAt: null,
    stale: false,
  });
  return {
    match: async () => saved.clone(),
    put: async (_key: string, response: Response) => {
      saved = response;
    },
  };
}
const offline: typeof fetch = async () => {
  throw new Error('offline');
};
test('only safe, enabled, non-reserved repository paths are accepted', () => {
  const data = {
    mirrors: [
      ...upstream.mirrors,
      { cname: 'evil', url: 'https://evil.test' },
      { cname: 'docs', url: '/docs' },
      { cname: 'bad', url: '/a/../b' },
      { cname: 'off', url: '/off', disable: true },
      upstream.mirrors[0],
    ],
  };
  assert.deepEqual(parseCernet(data), repos);
  for (const data of [null, {}, { mirrors: [] }, { mirrors: [{ cname: 'x' }] }])
    assert.throws(() => parseCernet(data));
});
test('redirects preserve encoded file paths and query strings with a fixed origin', () => {
  assert.equal(
    redirectTarget(
      new URL('https://local/ubuntu/dists/noble/Release?x=a%2Fb'),
      repos,
    ),
    'https://mirrors.cernet.edu.cn/ubuntu/dists/noble/Release?x=a%2Fb',
  );
  assert.equal(
    redirectTarget(
      new URL('https://local/git/test.git/info/refs?service=git-upload-pack'),
      repos,
    ),
    'https://mirrors.cernet.edu.cn/git/test.git/info/refs?service=git-upload-pack',
  );
  for (const path of [
    '/ubuntuevil/',
    '/git/other.git/',
    '/docs/ubuntu/',
    '/unknown/',
    '/ubuntu/%5cfoo',
    '/ubuntu/%252e%252e/x',
  ])
    assert.equal(redirectTarget(new URL('https://local' + path), repos), null);
});
test('documentation matches repository paths independently of display names', () => {
  const meta = {
    label: 'Node.js 镜像',
    category: '开发工具',
    mark: 'N',
    color: '#618944',
    slug: 'nodejs',
  };
  const docs = { npm: meta, 'nodejs-release': meta };
  assert.equal(
    mirrorMeta({ name: 'Node.js releases', path: '/nodejs-release' }, docs)
      .slug,
    'nodejs',
  );
  assert.equal(mirrorMeta({ name: 'npm', path: '/npm' }, docs).slug, 'nodejs');
  assert.equal(
    mirrorMeta({ name: 'npm', path: '/unknown' }, docs).slug,
    undefined,
  );
});
test('fresh edge cache avoids upstream requests', async () => {
  assert.equal((await loadCernet(cacheAt(1000), offline, now)).stale, false);
});
test('upstream errors use bounded stale data but never indefinitely', async () => {
  assert.equal((await loadCernet(cacheAt(600000), offline, now)).stale, true);
  await assert.rejects(loadCernet(cacheAt(86400001), offline, now));
  await assert.rejects(loadCernet(undefined, offline, now));
});
test('invalid upstream response cannot overwrite previous cache', async () => {
  const cache = cacheAt(600000);
  const invalid: typeof fetch = async () => Response.json({ mirrors: [] });
  assert.equal((await loadCernet(cache, invalid, now)).stale, true);
  assert.deepEqual((await (await cache.match()).json()).mirrors, repos);
});
test('valid upstream refresh stores fetch time separately from source update time', async () => {
  const cache = cacheAt(600000);
  const fetcher: typeof fetch = async (_url, init) => {
    // CERNET rejects requests without a User-Agent in the Workers runtime.
    assert.match(
      new Headers(init?.headers).get('User-Agent') ?? '',
      /Mozilla\/5\.0 .* Chrome\/[\d.]+ Safari\/[\d.]+ Edg\/[\d.]+$/,
    );
    assert.equal(init?.redirect, 'manual');
    return Response.json(upstream, {
      headers: { 'Last-Modified': 'Sun, 06 Sep 2026 16:13:21 GMT' },
    });
  };
  const feed = await loadCernet(cache, fetcher, now);
  assert.equal(feed.stale, false);
  assert.equal(feed.fetchedAt, new Date(now).toISOString());
  assert.equal(feed.sourceUpdatedAt, 'Sun, 06 Sep 2026 16:13:21 GMT');
});

test('HTTP handlers expose only metadata and bodyless temporary redirects', async () => {
  const { directoryResponse, mirrorResponse } =
    await import('../src/lib/server/http.ts');
  const load = async () => ({
    mirrors: repos,
    fetchedAt: new Date(now).toISOString(),
    sourceUpdatedAt: null,
    stale: false,
  });
  const result = await directoryResponse(load);
  assert.equal(result.status, 200);
  assert.equal((await result.json()).mirrors.length, 2);
  const redirected = await mirrorResponse(
    new Request('https://local/ubuntu/file?x=1', { method: 'HEAD' }),
    load,
  );
  assert.equal(redirected.status, 302);
  assert.equal(
    redirected.headers.get('location'),
    'https://mirrors.cernet.edu.cn/ubuntu/file?x=1',
  );
  assert.equal(await redirected.text(), '');
  assert.equal(redirected.headers.get('cache-control'), 'no-store');
  assert.equal(
    (
      await mirrorResponse(
        new Request('https://local/ubuntu/', { method: 'POST' }),
        load,
      )
    ).status,
    405,
  );
  assert.equal(
    (await mirrorResponse(new Request('https://local/docs/ubuntu/'), load))
      .status,
    404,
  );
  assert.equal(
    (await mirrorResponse(new Request('https://local/unknown/'), load)).status,
    404,
  );
  assert.equal(
    (
      await directoryResponse(async () => {
        throw new Error('offline');
      })
    ).status,
    503,
  );
});
