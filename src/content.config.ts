import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const photography = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/photography' }),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    category: z.string(),
    year: z.string(),
    camera: z.string().optional(),
    settings: z.string().optional(),
    technique: z.string().optional(),
    post_processing: z.string().optional(),
  }),
});

export const collections = {
  photography,
};
