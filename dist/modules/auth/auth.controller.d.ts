import { Request, Response, NextFunction } from 'express';
export declare class AuthController {
    /**
     * Handle user signup
     */
    static signUp(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Handle user login
     */
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AuthController;
