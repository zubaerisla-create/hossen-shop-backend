"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const validate_1 = require("../../middlewares/validate");
const auth_1 = require("../../middlewares/auth");
const limiter_1 = require("../../config/limiter");
const orders_validation_1 = require("./orders.validation");
const router = (0, express_1.Router)();
// All order routes require basic customer authentication
router.use(auth_1.authenticate);
// Admin-only endpoints (must be declared before /:id to avoid route conflict)
router.get('/all', auth_1.requireAdmin, orders_controller_1.OrdersController.getAllOrders);
// Customer endpoints
router.post('/', limiter_1.authLimiter, (0, validate_1.validate)(orders_validation_1.createOrderSchema), orders_controller_1.OrdersController.createOrder);
router.get('/my', orders_controller_1.OrdersController.getMyOrders);
router.get('/:id', (0, validate_1.validate)(orders_validation_1.orderIdSchema), orders_controller_1.OrdersController.getOrderById);
// Admin /:id-based endpoints
router.put('/:id/status', auth_1.requireAdmin, (0, validate_1.validate)(orders_validation_1.updateOrderStatusSchema), orders_controller_1.OrdersController.updateOrderStatus);
router.put('/:id/assign', auth_1.requireAdmin, orders_controller_1.OrdersController.assignDeliveryPartner);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map