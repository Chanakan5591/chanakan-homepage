import { defineCollection, z } from 'astro:content';

const photography = defineCollection({
  type: 'data',
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
