export const CERNET_ORIGIN = 'https://mirrors.cernet.edu.cn';
export const CERNET_FEED = `${CERNET_ORIGIN}/static/json/legacy/cernet.json`;
export const RESERVED = new Set([
  'api',
  'docs',
  'blog',
  'about',
  '_astro',
  '_image',
  'mirrors.json',
  'favicon.svg',
  '404',
  'robots.txt',
]);
export interface Mirror {
  name: string;
  path: string;
}
export interface MirrorFeed {
  mirrors: Mirror[];
  fetchedAt: string;
  sourceUpdatedAt: string | null;
  stale: boolean;
}
export function validRepoPath(path: string): boolean {
  return (
    /^\/[A-Za-z0-9][A-Za-z0-9._+@/-]*$/.test(path) &&
    path
      .split('/')
      .slice(1)
      .every((part) => part !== '' && part !== '.' && part !== '..') &&
    !RESERVED.has(path.split('/')[1])
  );
}
export function parseCernet(value: unknown): Mirror[] {
  if (
    !value ||
    typeof value !== 'object' ||
    !('mirrors' in value) ||
    !Array.isArray(value.mirrors) ||
    !value.mirrors.length
  )
    throw new Error('Invalid CERNET feed');
  const seen = new Set<string>();
  const result: Mirror[] = [];
  for (const item of value.mirrors) {
    if (
      !item ||
      typeof item.cname !== 'string' ||
      typeof item.url !== 'string' ||
      !item.cname.trim()
    )
      throw new Error('Invalid repository');
    if (!validRepoPath(item.url) || item.disable === true || seen.has(item.url))
      continue;
    seen.add(item.url);
    result.push({ name: item.cname, path: item.url });
  }
  if (!result.length) throw new Error('Empty CERNET feed');
  return result.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}
export interface MirrorMetadata {
  label: string;
  category: string;
  mark: string;
  color: string;
  slug: string;
}
export function mirrorMeta(
  mirror: Mirror,
  docs: Record<string, MirrorMetadata>,
) {
  const meta = docs[mirror.path.slice(1)];
  return {
    label: meta ? `${meta.label} · ${mirror.name}` : mirror.name,
    category: meta?.category ?? '其他镜像',
    mark: meta?.mark ?? mirror.name.slice(0, 2).toUpperCase(),
    color: meta?.color ?? '#587f6d',
    slug: meta?.slug,
  };
}
export function redirectTarget(url: URL, mirrors: Mirror[]): string | null {
  let path: string;
  try {
    path = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
  if (
    /[\\\x00-\x1f\x7f]/.test(path) ||
    path.includes('%') ||
    path.split('/').some((part) => part === '.' || part === '..') ||
    RESERVED.has(path.split('/')[1])
  )
    return null;
  if (!mirrors.some((m) => path === m.path || path.startsWith(m.path + '/')))
    return null;
  return CERNET_ORIGIN + url.pathname + url.search;
}
