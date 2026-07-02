import { Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { AuthenticatedRequest } from '../../middlewares/auth';
import { env } from '../../config/env';
import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { ApiResponse } from '../../utils/apiResponse';

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export class PaymentsController {
  /**
   * Create a PaymentIntent for checkout
   */
  static async createPaymentIntent(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!stripe) {
        throw new ApiError(500, 'Stripe integration is not configured on the server. STRIPE_SECRET_KEY is missing.');
      }

      const { items } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
        throw ApiError.badRequest('Items are required to create a payment intent.');
      }

      // Extract unique product IDs
      const productIds = [...new Set(items.map((item: any) => item.productId))];
      
      // Query database for original prices to secure calculation
      const dbProducts = await prisma.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (dbProducts.length !== productIds.length) {
        throw ApiError.badRequest('One or more products in your cart could not be found.');
      }

      // Map prices
      const productMap = new Map(dbProducts.map((p) => [p.id, p]));
      let subtotal = 0;

      for (const item of items) {
        const product = productMap.get(item.productId);
        if (!product) {
          throw ApiError.internal('Product matching error.');
        }
        subtotal += product.price * item.quantity;
      }

      // Add tax (8% match with checkout page)
      const tax = subtotal * 0.08;
      const totalAmount = subtotal + tax;

      // Stripe requires amount in the smallest currency unit (cents for USD)
      const amountInCents = Math.round(totalAmount * 100);

      // Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
          userId: req.user?.id || 'anonymous',
          items: JSON.stringify(items.slice(0, 10).map((it: any) => ({ id: it.productId, q: it.quantity }))),
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      ApiResponse.success(res, 'Payment intent created successfully.', {
        clientSecret: paymentIntent.client_secret,
        amount: totalAmount,
        currency: 'usd',
      });
    } catch (error) {
      next(error);
    }
  }
}
export default PaymentsController;
