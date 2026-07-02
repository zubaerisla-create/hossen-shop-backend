import { Request, Response, NextFunction } from 'express';
import { NewsletterService } from './newsletter.service';
import { ApiResponse } from '../../utils/apiResponse';

export class NewsletterController {
  /**
   * Subscribe an email address to the newsletter
   */
  static async subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ success: false, message: 'Email address is required.' });
        return;
      }

      const subscriber = await NewsletterService.subscribe(email);
      ApiResponse.success(res, 'Thank you for subscribing to our newsletter!', subscriber, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all subscribers (Admin only)
   */
  static async getAllSubscribers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subscribers = await NewsletterService.getAllSubscribers();
      ApiResponse.success(res, 'Subscribers list retrieved successfully.', subscribers);
    } catch (error) {
      next(error);
    }
  }
}
export default NewsletterController;
