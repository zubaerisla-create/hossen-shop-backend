"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryIdSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
/**
 * Validation schema for creating a Category
 */
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ error: 'Category name is required.' })
            .min(2, 'Name must be at least 2 characters long.')
            .max(50, 'Name must not exceed 50 characters.'),
        image: zod_1.z
            .string({ error: 'Category image URL is required.' })
            .url('Image must be a valid URL.'),
    }),
});
/**
 * Validation schema for updating a Category
 */
exports.updateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, 'Name must be at least 2 characters long.')
            .max(50, 'Name must not exceed 50 characters.')
            .optional(),
        image: zod_1.z
            .string()
            .url('Image must be a valid URL.')
            .optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Category ID format.'),
    }),
});
/**
 * Validation schema for ID parameter verification
 */
exports.categoryIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Category ID format.'),
    }),
});
//# sourceMappingURL=categories.validation.js.map