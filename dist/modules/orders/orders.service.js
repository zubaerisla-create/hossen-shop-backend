"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class OrdersService {
    /**
     * Submit a new checkout order under a database transaction
     */
    static async createOrder(userId, itemsInput, paymentMethod) {
        // Extract all unique product IDs
        const productIds = [...new Set(itemsInput.map((item) => item.productId))];
        // Fetch products to verify existence and get current prices
        const dbProducts = await database_1.prisma.product.findMany({
            where: {
                id: { in: productIds },
            },
        });
        if (dbProducts.length !== productIds.length) {
            throw apiError_1.ApiError.badRequest('One or more products in your cart could not be found.');
        }
        // Create a product map for fast lookup
        const productMap = new Map(dbProducts.map((p) => [p.id, p]));
        let totalAmount = 0;
        // Build the order items dataset, freezing the price at checkout
        const orderItemsData = itemsInput.map((item) => {
            const product = productMap.get(item.productId);
            if (!product) {
                throw apiError_1.ApiError.internal('Product matching error during checkout calculation.');
            }
            const itemPrice = product.price;
            totalAmount += itemPrice * item.quantity;
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: itemPrice, // Freeze historical purchase price
            };
        });
        // Execute the order creation in an ACID transaction
        return database_1.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    status: paymentMethod === 'card' ? 'Confirmed' : 'Placed',
                    items: {
                        create: orderItemsData,
                    },
                },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });
            return order;
        });
    }
    /**
     * Fetch all orders belonging to a customer
     */
    static async getOrdersByUser(userId) {
        return database_1.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Fetch all orders globally (Admin only)
     */
    static async getAllOrders() {
        return database_1.prisma.order.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                unit: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Fetch a single order by ID. Restricts access to owner or administrator.
     */
    static async getOrderById(id, userId, isAdmin) {
        const order = await database_1.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                unit: true,
                            },
                        },
                    },
                },
            },
        });
        if (!order) {
            throw apiError_1.ApiError.notFound(`Order with ID ${id} not found.`);
        }
        // Authorization check: User must own the order or be an admin
        if (!isAdmin && order.userId !== userId) {
            throw apiError_1.ApiError.forbidden('You do not have authorization to view this order.');
        }
        return order;
    }
    /**
     * Update order fulfillment status (Admin only)
     */
    static async updateOrderStatus(id, status) {
        const order = await database_1.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw apiError_1.ApiError.notFound(`Order with ID ${id} not found.`);
        }
        return database_1.prisma.order.update({
            where: { id },
            data: { status },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    /**
     * Assign a delivery partner to an order (Admin only)
     */
    static async assignDeliveryPartner(id, partnerName) {
        const order = await database_1.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw apiError_1.ApiError.notFound(`Order with ID ${id} not found.`);
        }
        return database_1.prisma.order.update({
            where: { id },
            data: {
                deliveryPartner: partnerName || null,
                status: partnerName ? 'Assigned' : 'Placed',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
}
exports.OrdersService = OrdersService;
exports.default = OrdersService;
//# sourceMappingURL=orders.service.js.map