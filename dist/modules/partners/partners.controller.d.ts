import { Request, Response, NextFunction } from 'express';
export declare class PartnersController {
    /**
     * Get all delivery partners
     */
    static getAllPartners(_req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Add a delivery partner
     */
    static addPartner(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Toggle partner active state
     */
    static togglePartner(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Delete a partner
     */
    static deletePartner(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default PartnersController;
