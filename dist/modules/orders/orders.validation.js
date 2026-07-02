"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderIdSchema = exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
/**
 * Validation schema for submitting a new Order
 */
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z
            .array(zod_1.z.object({
            productId: zod_1.z.string().uuid('Product ID must be a valid UUID.'),
            quantity: zod_1.z.number().int('Quantity must be an integer.').positive('Quantity must be at least 1.'),
        }))
            .min(1, 'Order must contain at least one product item.'),
    }),
});
/**
 * Validation schema for updating order status (Admin only)
 */
exports.updateOrderStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['Placed', 'Confirmed', 'Assigned', 'Out for Delivery', 'Delivered', 'Cancelled'], { error: "Status must be one of: Placed, Confirmed, Assigned, Out for Delivery, Delivered, Cancelled." }),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Order ID format.'),
    }),
});
/**
 * Validation schema for single Order actions
 */
exports.orderIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid Order ID format.'),
    }),
});
//# sourceMappingURL=orders.validation.js.map