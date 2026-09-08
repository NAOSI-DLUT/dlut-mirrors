import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import * as icons from 'simple-icons';

export const prerender = true;
export async function getStaticPaths() {
  const names = new Set(
    (await getCollection('docs')).flatMap((doc) =>
      doc.data.icon ? [doc.data.icon] : [],
    ),
  );
  const available = new Map(
    Object.values(icons).map((icon) => [icon.slug, icon]),
  );
  return [...names].map((name) => {
    const icon = available.get(name);
    if (!icon) throw new Error(`Unknown Simple Icons slug in docs: ${name}`);
    return {
      params: { icon: name },
      props: { path: icon.path, hex: icon.hex },
    };
  });
}
export const GET: APIRoute = ({ props }) =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${props.hex}"><path d="${props.path}"/></svg>`,
    {
      headers: {
        'Content-Type': 'image/svg+xml',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  );
