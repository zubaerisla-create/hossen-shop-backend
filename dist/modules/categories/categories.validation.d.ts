import { z } from 'zod';
/**
 * Validation schema for creating a Category
 */
export declare const createCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        image: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for updating a Category
 */
export declare const updateCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for ID parameter verification
 */
export declare const categoryIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
