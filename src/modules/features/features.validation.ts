import { z } from 'zod';

/**
 * Validation schema for creating a homepage Feature
 */
export const createFeatureSchema = z.object({
  body: z.object({
    title: z
      .string({ error: 'Feature title is required.' })
      .min(2, 'Title must be at least 2 characters long.')
      .max(100, 'Title must not exceed 100 characters.'),
    subtitle: z
      .string({ error: 'Feature subtitle is required.' })
      .min(2, 'Subtitle must be at least 2 characters long.')
      .max(100, 'Subtitle must not exceed 100 characters.'),
    iconName: z.enum(['delivery', 'organic', 'delivery-time', 'secure-pay'], {
      error: "Icon name must be 'delivery', 'organic', 'delivery-time', or 'secure-pay'.",
    }),
  }),
});

/**
 * Validation schema for updating an existing homepage Feature
 */
export const updateFeatureSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(2, 'Title must be at least 2 characters long.')
      .max(100, 'Title must not exceed 100 characters.')
      .optional(),
    subtitle: z
      .string()
      .min(2, 'Subtitle must be at least 2 characters long.')
      .max(100, 'Subtitle must not exceed 100 characters.')
      .optional(),
    iconName: z
      .enum(['delivery', 'organic', 'delivery-time', 'secure-pay'])
      .optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid Feature ID format.'),
  }),
});

/**
 * Validation schema for actions referencing a single Feature ID
 */
export const featureIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Feature ID format.'),
  }),
});
