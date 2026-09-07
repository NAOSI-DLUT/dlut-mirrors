import type { APIRoute } from 'astro';
import { directoryResponse } from '../lib/server/http';

export const prerender = false;
export const GET: APIRoute = () => directoryResponse();
export const HEAD: APIRoute = async () => {
  const response = await directoryResponse();
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
};
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
