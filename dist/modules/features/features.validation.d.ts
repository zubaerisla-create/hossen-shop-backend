import { z } from 'zod';
/**
 * Validation schema for creating a homepage Feature
 */
export declare const createFeatureSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        subtitle: z.ZodString;
        iconName: z.ZodEnum<{
            delivery: "delivery";
            organic: "organic";
            "delivery-time": "delivery-time";
            "secure-pay": "secure-pay";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for updating an existing homepage Feature
 */
export declare const updateFeatureSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        subtitle: z.ZodOptional<z.ZodString>;
        iconName: z.ZodOptional<z.ZodEnum<{
            delivery: "delivery";
            organic: "organic";
            "delivery-time": "delivery-time";
            "secure-pay": "secure-pay";
        }>>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for actions referencing a single Feature ID
 */
export declare const featureIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
