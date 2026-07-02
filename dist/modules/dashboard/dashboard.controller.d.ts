import { Request, Response, NextFunction } from 'express';
export declare class DashboardController {
    static getStats(_req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static sendEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
