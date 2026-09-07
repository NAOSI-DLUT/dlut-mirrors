import type { APIRoute } from 'astro';
import { mirrorResponse } from '../lib/server/http';

export const prerender = false;
export const ALL: APIRoute = ({ request }) => mirrorResponse(request);
