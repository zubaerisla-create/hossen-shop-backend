import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';

export class NewsletterService {
  /**
   * Subscribe an email address
   */
  static async subscribe(email: string) {
    const trimmedEmail = email.toLowerCase().trim();

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      throw new ApiError(400, 'This email is already subscribed to our newsletter.');
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email: trimmedEmail },
    });

    return subscriber;
  }

  /**
   * Fetch all subscribers (Admin only)
   */
  static async getAllSubscribers() {
    return prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
export default NewsletterService;
