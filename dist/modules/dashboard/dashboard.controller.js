"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const database_1 = require("../../config/database");
const email_1 = require("../../utils/email");
class DashboardController {
    static async getStats(_req, res, next) {
        try {
            // 1. Core counters
            const totalOrders = await database_1.prisma.order.count();
            const uniqueUsers = await database_1.prisma.user.count();
            const totalProducts = await database_1.prisma.product.count();
            // Stock column is not defined in database schema currently, so count as 0 out-of-stock
            const outOfStock = 0;
            // 2. Total earnings from non-cancelled orders
            const earnResult = await database_1.prisma.order.aggregate({
                _sum: {
                    totalAmount: true,
                },
                where: {
                    status: {
                        not: 'Cancelled',
                    },
                },
            });
            const totalEarn = earnResult._sum.totalAmount || 0;
            // 3. Monthly Sales (Last 6 Months)
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
            sixMonthsAgo.setDate(1);
            sixMonthsAgo.setHours(0, 0, 0, 0);
            const orders = await database_1.prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: sixMonthsAgo,
                    },
                    status: {
                        not: 'Cancelled',
                    },
                },
                select: {
                    totalAmount: true,
                    createdAt: true,
                },
            });
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthlyData = {};
            // Initialize monthly slots to ensure we return exactly 6 months
            for (let i = 5; i >= 0; i--) {
                const d = new Date();
                d.setMonth(d.getMonth() - i);
                const monthKey = monthNames[d.getMonth()];
                monthlyData[monthKey] = { sales: 0, orders: 0 };
            }
            orders.forEach((order) => {
                const monthKey = monthNames[order.createdAt.getMonth()];
                if (monthlyData[monthKey] !== undefined) {
                    monthlyData[monthKey].sales += order.totalAmount;
                    monthlyData[monthKey].orders += 1;
                }
            });
            const monthlySalesData = Object.entries(monthlyData).map(([month, data]) => ({
                month,
                sales: Number(data.sales.toFixed(2)),
                orders: data.orders,
            }));
            // 4. Category breakdown sales
            const orderItems = await database_1.prisma.orderItem.findMany({
                where: {
                    order: {
                        status: {
                            not: 'Cancelled',
                        },
                    },
                },
                select: {
                    quantity: true,
                    price: true,
                    product: {
                        select: {
                            category: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            const categoryMap = {};
            orderItems.forEach((item) => {
                const categoryName = item.product?.category?.name || 'Uncategorized';
                const revenue = item.quantity * item.price;
                categoryMap[categoryName] = (categoryMap[categoryName] || 0) + revenue;
            });
            const colors = ['#0F2C1F', '#10B981', '#FF8A00', '#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B'];
            const categorySalesData = Object.entries(categoryMap).map(([category, value], idx) => ({
                category,
                value: Number(value.toFixed(2)),
                color: colors[idx % colors.length],
            }));
            return res.status(200).json({
                success: true,
                message: 'Dashboard metrics retrieved successfully.',
                data: {
                    stats: {
                        totalOrders,
                        uniqueUsers,
                        totalProducts,
                        outOfStock,
                        totalEarn: Number(totalEarn.toFixed(2)),
                    },
                    monthlySalesData,
                    categorySalesData,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async sendEmail(req, res, next) {
        try {
            const { recipients, subject, body } = req.body;
            if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Recipients must be a non-empty array of email addresses.',
                });
            }
            // Fetch users from db to get names for personalized greetings
            const users = await database_1.prisma.user.findMany({
                where: {
                    email: {
                        in: recipients,
                    },
                },
                select: {
                    email: true,
                    name: true,
                },
            });
            const userMap = new Map(users.map((u) => [u.email.toLowerCase(), u.name || 'Valued Customer']));
            // Send emails
            const sendPromises = recipients.map(async (email) => {
                const name = userMap.get(email.toLowerCase()) || 'Valued Customer';
                const personalizedBody = body.replace(/{name}/g, name);
                return (0, email_1.sendEmail)({
                    to: email,
                    subject,
                    text: personalizedBody,
                });
            });
            await Promise.all(sendPromises);
            return res.status(200).json({
                success: true,
                message: `Email successfully sent to ${recipients.length} recipients.`,
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map