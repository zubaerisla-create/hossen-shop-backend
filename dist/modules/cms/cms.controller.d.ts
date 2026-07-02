import { Request, Response, NextFunction } from 'express';
export declare class CmsController {
    /**
     * Get a CMS setting by key
     */
    static getSetting(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update a CMS setting by key (Admin only)
     */
    static updateSetting(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default CmsController;
