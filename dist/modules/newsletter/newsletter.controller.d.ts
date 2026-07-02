import { Request, Response, NextFunction } from 'express';
export declare class NewsletterController {
    /**
     * Subscribe an email address to the newsletter
     */
    static subscribe(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get all subscribers (Admin only)
     */
    static getAllSubscribers(_req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default NewsletterController;
