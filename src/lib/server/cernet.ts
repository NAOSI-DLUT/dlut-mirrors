import { CERNET_FEED, parseCernet, type MirrorFeed } from '../mirrors.ts';
const FRESH_MS = 5 * 60 * 1000;
const STALE_MS = 24 * 60 * 60 * 1000;
const KEY = 'https://naosi-mirrors.internal/cernet-v1';
interface CacheStore {
  match(key: string): Promise<Response | undefined>;
  put(key: string, response: Response): Promise<void>;
}
export async function loadCernet(
  cache?: CacheStore,
  fetcher: typeof fetch = fetch,
  now = Date.now(),
): Promise<MirrorFeed> {
  let previous: MirrorFeed | undefined;
  try {
    const hit = await cache?.match(KEY);
    if (hit) previous = (await hit.json()) as MirrorFeed;
  } catch {
    /* Cache failures must not prevent upstream reads. */
  }
  const age = previous ? now - Date.parse(previous.fetchedAt) : Infinity;
  if (previous && age >= 0 && age < FRESH_MS)
    return { ...previous, stale: false };
  try {
    const response = await fetcher(CERNET_FEED, {
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
      },
    });
    if (!response.ok) throw new Error(`CERNET HTTP ${response.status}`);
    const feed: MirrorFeed = {
      mirrors: parseCernet(await response.json()),
      fetchedAt: new Date(now).toISOString(),
      sourceUpdatedAt: response.headers.get('last-modified'),
      stale: false,
    };
    try {
      await cache?.put(
        KEY,
        Response.json(feed, {
          headers: { 'Cache-Control': 'public, max-age=86400' },
        }),
      );
    } catch {
      /* Serve valid data even when cache writes fail. */
    }
    return feed;
  } catch (error) {
    console.warn('CERNET upstream request failed', error);
    if (previous && age >= 0 && age < STALE_MS)
      return { ...previous, stale: true };
    throw error;
  }
}
let memory: Response | undefined;
const memoryCache: CacheStore = {
  match: async () => memory?.clone(),
  put: async (_key, response) => {
    memory = response.clone();
  },
};
export async function getCernet(): Promise<MirrorFeed> {
  // Web-standard Cache API where available; in-process cache for Node development.
  const cache =
    typeof caches === 'undefined'
      ? memoryCache
      : await caches.open('naosi-cernet-v1');
  return loadCernet(cache);
}
