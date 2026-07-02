"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureIdSchema = exports.updateFeatureSchema = exports.createFeatureSchema = void 0;
const zod_1 = require("zod");
/**
 * Validation schema for creating a homepage Feature
 */
exports.createFeatureSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ error: 'Feature title is required.' })
            .min(2, 'Title must be at least 2 characters long.')
            .max(100, 'Title must not exceed 100 characters.'),
        subtitle: zod_1.z
            .string({ error: 'Feature subtitle is required.' })
            .min(2, 'Subtitle must be at least 2 characters long.')
            .max(100, 'Subtitle must not exceed 100 characters.'),
        iconName: zod_1.z.enum(['delivery', 'organic', 'delivery-time', 'secure-pay'], {
            error: "Icon name must be 'delivery', 'organic', 'delivery-time', or 'secure-pay'.",
        }),
    }),
});
/**
 * Validation schema for updating an existing homepage Feature
 */
exports.updateFeatureSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(2, 'Title must be at least 2 characters long.')
            .max(100, 'Title must not exceed 100 characters.')
            .optional(),
        subtitle: zod_1.z
            .string()
            .min(2, 'Subtitle must be at least 2 characters long.')
            .max(100, 'Subtitle must not exceed 100 characters.')
            .optional(),
        iconName: zod_1.z
            .enum(['delivery', 'organic', 'delivery-time', 'secure-pay'])
            .optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Feature ID format.'),
    }),
});
/**
 * Validation schema for actions referencing a single Feature ID
 */
exports.featureIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Feature ID format.'),
    }),
});
//# sourceMappingURL=features.validation.js.map