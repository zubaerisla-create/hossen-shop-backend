"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletter_controller_1 = require("./newsletter.controller");
const auth_1 = require("../../middlewares/auth");
const limiter_1 = require("../../config/limiter");
const router = (0, express_1.Router)();
// Public newsletter signup endpoint
router.post('/subscribe', limiter_1.authLimiter, newsletter_controller_1.NewsletterController.subscribe);
// Admin-only list retrieve
router.get('/subscribers', auth_1.authenticate, auth_1.requireAdmin, newsletter_controller_1.NewsletterController.getAllSubscribers);
exports.default = router;
//# sourceMappingURL=newsletter.routes.js.map