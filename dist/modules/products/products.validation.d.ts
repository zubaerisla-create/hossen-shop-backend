import { z } from 'zod';
/**
 * Validation schema for creating a new Product
 */
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNumber;
        unit: z.ZodString;
        originalPrice: z.ZodOptional<z.ZodNumber>;
        discount: z.ZodOptional<z.ZodNumber>;
        image: z.ZodString;
        categoryId: z.ZodString;
        isFlashDeal: z.ZodOptional<z.ZodBoolean>;
        flashLabel: z.ZodOptional<z.ZodString>;
        flashDiscount: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for updating an existing Product
 */
export declare const updateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        unit: z.ZodOptional<z.ZodString>;
        originalPrice: z.ZodOptional<z.ZodNumber>;
        discount: z.ZodOptional<z.ZodNumber>;
        image: z.ZodOptional<z.ZodString>;
        categoryId: z.ZodOptional<z.ZodString>;
        isFlashDeal: z.ZodOptional<z.ZodBoolean>;
        flashLabel: z.ZodOptional<z.ZodString>;
        flashDiscount: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for single Product actions (fetch, delete)
 */
export declare const productIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for parsing filtering, sorting, and pagination options from Query String
 */
export declare const getProductsQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        search: z.ZodOptional<z.ZodString>;
        categoryId: z.ZodOptional<z.ZodString>;
        minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        sortBy: z.ZodDefault<z.ZodEnum<{
            name: "name";
            createdAt: "createdAt";
            rating: "rating";
            price: "price";
        }>>;
        sortOrder: z.ZodDefault<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
