import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        category: z.string(),
        categoryColor: z.enum(['quaternary', 'secondary']).default('quaternary'),
        icon: z.enum(['microphone', 'music', 'bolt']).default('bolt'),
        image: z.string().optional(),
    }),
});

export const collections = { blog };
