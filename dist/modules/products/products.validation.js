"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsQuerySchema = exports.productIdSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
/**
 * Validation schema for creating a new Product
 */
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ error: 'Product name is required.' })
            .min(2, 'Product name must be at least 2 characters long.')
            .max(100, 'Product name must not exceed 100 characters.'),
        price: zod_1.z
            .number({ error: 'Product price is required.' })
            .positive('Price must be greater than 0.'),
        unit: zod_1.z
            .string({ error: 'Product unit is required (e.g. 200g, 1.5L).' })
            .min(1, 'Unit must not be empty.'),
        originalPrice: zod_1.z
            .number()
            .positive('Original price must be greater than 0.')
            .optional(),
        discount: zod_1.z
            .number()
            .int('Discount percentage must be an integer.')
            .min(0, 'Discount cannot be negative.')
            .max(100, 'Discount cannot exceed 100%.')
            .optional(),
        image: zod_1.z
            .string({ error: 'Product image URL is required.' })
            .url('Image must be a valid URL.'),
        categoryId: zod_1.z
            .string({ error: 'Category ID is required.' })
            .uuid('Category ID must be a valid UUID.'),
        isFlashDeal: zod_1.z.boolean().optional(),
        flashLabel: zod_1.z.string().optional(),
        flashDiscount: zod_1.z.number().min(0).max(100).optional(),
    }),
});
/**
 * Validation schema for updating an existing Product
 */
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, 'Product name must be at least 2 characters long.')
            .max(100, 'Product name must not exceed 100 characters.')
            .optional(),
        price: zod_1.z
            .number()
            .positive('Price must be greater than 0.')
            .optional(),
        unit: zod_1.z
            .string()
            .min(1, 'Unit must not be empty.')
            .optional(),
        originalPrice: zod_1.z
            .number()
            .positive('Original price must be greater than 0.')
            .optional(),
        discount: zod_1.z
            .number()
            .int('Discount percentage must be an integer.')
            .min(0, 'Discount cannot be negative.')
            .max(100, 'Discount cannot exceed 100%.')
            .optional(),
        image: zod_1.z
            .string()
            .url('Image must be a valid URL.')
            .optional(),
        categoryId: zod_1.z
            .string()
            .uuid('Category ID must be a valid UUID.')
            .optional(),
        isFlashDeal: zod_1.z.boolean().optional(),
        flashLabel: zod_1.z.string().optional(),
        flashDiscount: zod_1.z.number().min(0).max(100).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Product ID format.'),
    }),
});
/**
 * Validation schema for single Product actions (fetch, delete)
 */
exports.productIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Product ID format.'),
    }),
});
/**
 * Validation schema for parsing filtering, sorting, and pagination options from Query String
 */
exports.getProductsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        search: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().uuid('Invalid Category ID format.').optional(),
        minPrice: zod_1.z.coerce.number().positive().optional(),
        maxPrice: zod_1.z.coerce.number().positive().optional(),
        page: zod_1.z.coerce.number().int().positive().default(1),
        limit: zod_1.z.coerce.number().int().positive().default(10),
        sortBy: zod_1.z.enum(['name', 'price', 'rating', 'createdAt']).default('createdAt'),
        sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
    }),
});
//# sourceMappingURL=products.validation.js.map