import { z } from 'zod';

/**
 * Validation schema for creating a new Product
 */
export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Product name is required.' })
      .min(2, 'Product name must be at least 2 characters long.')
      .max(100, 'Product name must not exceed 100 characters.'),
    price: z
      .number({ error: 'Product price is required.' })
      .positive('Price must be greater than 0.'),
    unit: z
      .string({ error: 'Product unit is required (e.g. 200g, 1.5L).' })
      .min(1, 'Unit must not be empty.'),
    originalPrice: z
      .number()
      .positive('Original price must be greater than 0.')
      .optional(),
    discount: z
      .number()
      .int('Discount percentage must be an integer.')
      .min(0, 'Discount cannot be negative.')
      .max(100, 'Discount cannot exceed 100%.')
      .optional(),
    image: z
      .string({ error: 'Product image URL is required.' })
      .url('Image must be a valid URL.'),
    categoryId: z
      .string({ error: 'Category ID is required.' })
      .uuid('Category ID must be a valid UUID.'),
    isFlashDeal: z.boolean().optional(),
    flashLabel: z.string().nullable().optional(),
    flashDiscount: z.number().min(0).max(100).nullable().optional(),
  }),
});

/**
 * Validation schema for updating an existing Product
 */
export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Product name must be at least 2 characters long.')
      .max(100, 'Product name must not exceed 100 characters.')
      .optional(),
    price: z
      .number()
      .positive('Price must be greater than 0.')
      .optional(),
    unit: z
      .string()
      .min(1, 'Unit must not be empty.')
      .optional(),
    originalPrice: z
      .number()
      .positive('Original price must be greater than 0.')
      .optional(),
    discount: z
      .number()
      .int('Discount percentage must be an integer.')
      .min(0, 'Discount cannot be negative.')
      .max(100, 'Discount cannot exceed 100%.')
      .optional(),
    image: z
      .string()
      .url('Image must be a valid URL.')
      .optional(),
    categoryId: z
      .string()
      .uuid('Category ID must be a valid UUID.')
      .optional(),
    isFlashDeal: z.boolean().optional(),
    flashLabel: z.string().nullable().optional(),
    flashDiscount: z.number().min(0).max(100).nullable().optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid Product ID format.'),
  }),
});

/**
 * Validation schema for single Product actions (fetch, delete)
 */
export const productIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Product ID format.'),
  }),
});

/**
 * Validation schema for parsing filtering, sorting, and pagination options from Query String
 */
export const getProductsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    categoryId: z.string().uuid('Invalid Category ID format.').optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    sortBy: z.enum(['name', 'price', 'rating', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});
