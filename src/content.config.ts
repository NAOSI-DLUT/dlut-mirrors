import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
export const collections = {
  help: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/help' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      featured: z
        .object({ label: z.string(), order: z.number().int().nonnegative() })
        .optional(),
    }),
  }),
  posts: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
};
