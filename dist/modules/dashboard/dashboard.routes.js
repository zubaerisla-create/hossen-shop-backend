"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Retrieve dashboard stats for authenticated administrators
router.get('/stats', auth_1.authenticate, auth_1.requireAdmin, dashboard_controller_1.DashboardController.getStats);
// Send emails to users/subscribers
router.post('/send-email', auth_1.authenticate, auth_1.requireAdmin, dashboard_controller_1.DashboardController.sendEmail);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map