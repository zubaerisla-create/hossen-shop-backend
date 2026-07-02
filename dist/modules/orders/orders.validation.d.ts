import { z } from 'zod';
/**
 * Validation schema for submitting a new Order
 */
export declare const createOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            quantity: z.ZodNumber;
        }, z.core.$strip>>;
        paymentMethod: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for updating order status (Admin only)
 */
export declare const updateOrderStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            Confirmed: "Confirmed";
            Placed: "Placed";
            Assigned: "Assigned";
            "Out for Delivery": "Out for Delivery";
            Delivered: "Delivered";
            Cancelled: "Cancelled";
        }>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Validation schema for single Order actions
 */
export declare const orderIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
