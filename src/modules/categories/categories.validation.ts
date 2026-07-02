import { z } from 'zod';

/**
 * Validation schema for creating a Category
 */
export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Category name is required.' })
      .min(2, 'Name must be at least 2 characters long.')
      .max(50, 'Name must not exceed 50 characters.'),
    image: z
      .string({ error: 'Category image URL is required.' })
      .url('Image must be a valid URL.'),
  }),
});

/**
 * Validation schema for updating a Category
 */
export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long.')
      .max(50, 'Name must not exceed 50 characters.')
      .optional(),
    image: z
      .string()
      .url('Image must be a valid URL.')
      .optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid Category ID format.'),
  }),
});

/**
 * Validation schema for ID parameter verification
 */
export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Category ID format.'),
  }),
});
