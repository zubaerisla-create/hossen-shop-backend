export declare class NewsletterService {
    /**
     * Subscribe an email address
     */
    static subscribe(email: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
    }>;
    /**
     * Fetch all subscribers (Admin only)
     */
    static getAllSubscribers(): Promise<{
        id: string;
        createdAt: Date;
        email: string;
    }[]>;
}
export default NewsletterService;
