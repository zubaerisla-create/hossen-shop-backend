"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../../config/env");
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
const apiResponse_1 = require("../../utils/apiResponse");
const stripe = env_1.env.STRIPE_SECRET_KEY ? new stripe_1.default(env_1.env.STRIPE_SECRET_KEY) : null;
class PaymentsController {
    /**
     * Create a PaymentIntent for checkout
     */
    static async createPaymentIntent(req, res, next) {
        try {
            if (!stripe) {
                throw new apiError_1.ApiError(500, 'Stripe integration is not configured on the server. STRIPE_SECRET_KEY is missing.');
            }
            const { items } = req.body;
            if (!items || !Array.isArray(items) || items.length === 0) {
                throw apiError_1.ApiError.badRequest('Items are required to create a payment intent.');
            }
            // Extract unique product IDs
            const productIds = [...new Set(items.map((item) => item.productId))];
            // Query database for original prices to secure calculation
            const dbProducts = await database_1.prisma.product.findMany({
                where: {
                    id: { in: productIds },
                },
            });
            if (dbProducts.length !== productIds.length) {
                throw apiError_1.ApiError.badRequest('One or more products in your cart could not be found.');
            }
            // Map prices
            const productMap = new Map(dbProducts.map((p) => [p.id, p]));
            let subtotal = 0;
            for (const item of items) {
                const product = productMap.get(item.productId);
                if (!product) {
                    throw apiError_1.ApiError.internal('Product matching error.');
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
                    items: JSON.stringify(items.slice(0, 10).map((it) => ({ id: it.productId, q: it.quantity }))),
                },
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            apiResponse_1.ApiResponse.success(res, 'Payment intent created successfully.', {
                clientSecret: paymentIntent.client_secret,
                amount: totalAmount,
                currency: 'usd',
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PaymentsController = PaymentsController;
exports.default = PaymentsController;
//# sourceMappingURL=payments.controller.js.map