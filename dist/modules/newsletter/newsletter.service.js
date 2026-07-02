"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class NewsletterService {
    /**
     * Subscribe an email address
     */
    static async subscribe(email) {
        const trimmedEmail = email.toLowerCase().trim();
        const existing = await database_1.prisma.newsletterSubscriber.findUnique({
            where: { email: trimmedEmail },
        });
        if (existing) {
            throw new apiError_1.ApiError(400, 'This email is already subscribed to our newsletter.');
        }
        const subscriber = await database_1.prisma.newsletterSubscriber.create({
            data: { email: trimmedEmail },
        });
        return subscriber;
    }
    /**
     * Fetch all subscribers (Admin only)
     */
    static async getAllSubscribers() {
        return database_1.prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.NewsletterService = NewsletterService;
exports.default = NewsletterService;
//# sourceMappingURL=newsletter.service.js.map