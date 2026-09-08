import type { CollectionEntry } from 'astro:content';
import type { MirrorMetadata } from './mirrors';

export function docMetadata(doc: CollectionEntry<'docs'>): MirrorMetadata {
  return {
    label: doc.data.title,
    category: doc.data.category,
    mark: doc.data.mark ?? doc.data.title.slice(0, 2),
    color: doc.data.color,
    slug: doc.id,
    icon: doc.data.icon ? `/icons/${doc.data.icon}.svg` : undefined,
  };
}

export function mirrorDocs(
  docs: CollectionEntry<'docs'>[],
): Record<string, MirrorMetadata> {
  const entries = new Map<string, MirrorMetadata>();
  for (const doc of docs) {
    for (const repository of doc.data.mirrors ?? [doc.id]) {
      if (entries.has(repository))
        throw new Error(`Duplicate mirror documentation: ${repository}`);
      entries.set(repository, docMetadata(doc));
    }
  }
  return Object.fromEntries(entries);
}
