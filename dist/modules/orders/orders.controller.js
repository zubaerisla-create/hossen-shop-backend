"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const orders_service_1 = require("./orders.service");
const apiResponse_1 = require("../../utils/apiResponse");
const apiError_1 = require("../../utils/apiError");
class OrdersController {
    /**
     * Submit a new checkout order
     */
    static async createOrder(req, res, next) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized();
            }
            const order = await orders_service_1.OrdersService.createOrder(req.user.id, req.body.items, req.body.paymentMethod);
            apiResponse_1.ApiResponse.success(res, 'Order placed successfully.', order, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Fetch all orders placed by the current customer
     */
    static async getMyOrders(req, res, next) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized();
            }
            const orders = await orders_service_1.OrdersService.getOrdersByUser(req.user.id);
            apiResponse_1.ApiResponse.success(res, 'Your orders retrieved successfully.', orders);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Fetch a single order's details (restricted to owner or admin)
     */
    static async getOrderById(req, res, next) {
        try {
            if (!req.user) {
                throw apiError_1.ApiError.unauthorized();
            }
            const id = req.params.id;
            const isAdmin = req.user.role === 'admin';
            const order = await orders_service_1.OrdersService.getOrderById(id, req.user.id, isAdmin);
            apiResponse_1.ApiResponse.success(res, 'Order details retrieved successfully.', order);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Fetch all orders globally (Admin only)
     */
    static async getAllOrders(_req, res, next) {
        try {
            const orders = await orders_service_1.OrdersService.getAllOrders();
            apiResponse_1.ApiResponse.success(res, 'All orders retrieved successfully.', orders);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update an order's status (Admin only)
     */
    static async updateOrderStatus(req, res, next) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const order = await orders_service_1.OrdersService.updateOrderStatus(id, status);
            apiResponse_1.ApiResponse.success(res, 'Order status updated successfully.', order);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Assign a delivery partner to an order (Admin only)
     */
    static async assignDeliveryPartner(req, res, next) {
        try {
            const id = req.params.id;
            const { partnerName } = req.body;
            const order = await orders_service_1.OrdersService.assignDeliveryPartner(id, partnerName);
            apiResponse_1.ApiResponse.success(res, 'Delivery partner assigned successfully.', order);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrdersController = OrdersController;
exports.default = OrdersController;
//# sourceMappingURL=orders.controller.js.map