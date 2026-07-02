import { z } from 'zod';

/**
 * Validation schema for submitting a new Order
 */
export const createOrderSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          productId: z.string().uuid('Product ID must be a valid UUID.'),
          quantity: z.number().int('Quantity must be an integer.').positive('Quantity must be at least 1.'),
        })
      )
      .min(1, 'Order must contain at least one product item.'),
  }),
});

/**
 * Validation schema for updating order status (Admin only)
 */
export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(
      ['Placed', 'Confirmed', 'Assigned', 'Out for Delivery', 'Delivered', 'Cancelled'],
      { error: "Status must be one of: Placed, Confirmed, Assigned, Out for Delivery, Delivered, Cancelled." }
    ),
  }),
  params: z.object({
    id: z.string().uuid('Invalid Order ID format.'),
  }),
});

/**
 * Validation schema for single Order actions
 */
export const orderIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid Order ID format.'),
  }),
});
