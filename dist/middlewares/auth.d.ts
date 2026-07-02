import { Request, Response, NextFunction } from 'express';
/**
 * Interface extending Express Request to include the authenticated user info.
 */
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
/**
 * Middleware to authenticate requests using Supabase JWT.
 * Falls back to mock tokens in development if Supabase credentials are not configured.
 */
export declare const authenticate: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => Promise<void>;
/**
 * Middleware to restrict access to administrators only.
 * Must be placed after the 'authenticate' middleware.
 */
export declare const requireAdmin: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
