"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterController = void 0;
const newsletter_service_1 = require("./newsletter.service");
const apiResponse_1 = require("../../utils/apiResponse");
class NewsletterController {
    /**
     * Subscribe an email address to the newsletter
     */
    static async subscribe(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ success: false, message: 'Email address is required.' });
                return;
            }
            const subscriber = await newsletter_service_1.NewsletterService.subscribe(email);
            apiResponse_1.ApiResponse.success(res, 'Thank you for subscribing to our newsletter!', subscriber, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get all subscribers (Admin only)
     */
    static async getAllSubscribers(_req, res, next) {
        try {
            const subscribers = await newsletter_service_1.NewsletterService.getAllSubscribers();
            apiResponse_1.ApiResponse.success(res, 'Subscribers list retrieved successfully.', subscribers);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NewsletterController = NewsletterController;
exports.default = NewsletterController;
//# sourceMappingURL=newsletter.controller.js.map