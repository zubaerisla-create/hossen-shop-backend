"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const auth_1 = require("../../middlewares/auth");
const limiter_1 = require("../../config/limiter");
const router = (0, express_1.Router)();
// Secure checkout payment intent creation
router.post('/create-intent', auth_1.authenticate, limiter_1.authLimiter, payments_controller_1.PaymentsController.createPaymentIntent);
exports.default = router;
//# sourceMappingURL=payments.routes.js.map