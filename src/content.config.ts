import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      mirrors: z
        .array(z.string().regex(/^[A-Za-z0-9][A-Za-z0-9._+@/-]*$/))
        .optional(),
      category: z.string().default('其他镜像'),
      mark: z.string().optional(),
      color: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/)
        .default('#587f6d'),
      featured: z
        .object({ label: z.string(), order: z.number().int().nonnegative() })
        .optional(),
    }),
  }),
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
};
