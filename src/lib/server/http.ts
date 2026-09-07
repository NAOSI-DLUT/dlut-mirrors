import { RESERVED, redirectTarget, type MirrorFeed } from '../mirrors.ts';
import { getCernet } from './cernet.ts';
type Loader = () => Promise<MirrorFeed>;
export async function directoryResponse(
  load: Loader = getCernet,
): Promise<Response> {
  try {
    const feed = await load();
    return Response.json(feed, {
      headers: {
        'Cache-Control': feed.stale ? 'no-store' : 'public, max-age=60',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return Response.json(
      { error: 'CERNET 清单暂时不可用，请稍后重试。' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
      },
    );
  }
}
export async function mirrorResponse(
  request: Request,
  load: Loader = getCernet,
): Promise<Response> {
  const url = new URL(request.url);
  if (RESERVED.has(url.pathname.split('/')[1]))
    return new Response('Not found', { status: 404 });
  if (!['GET', 'HEAD'].includes(request.method))
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD' },
    });
  try {
    const target = redirectTarget(url, (await load()).mirrors);
    if (!target) return new Response('Unknown mirror', { status: 404 });
    return new Response(null, {
      status: 302,
      headers: { Location: target, 'Cache-Control': 'no-store' },
    });
  } catch {
    return new Response('Mirror directory temporarily unavailable', {
      status: 503,
      headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
    });
  }
}
