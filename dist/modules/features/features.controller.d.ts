import { Request, Response, NextFunction } from 'express';
export declare class FeaturesController {
    /**
     * Get all features
     */
    static getAllFeatures(_req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get feature by ID
     */
    static getFeatureById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Create a homepage marketing feature (requires admin credentials)
     */
    static createFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update an existing feature (requires admin credentials)
     */
    static updateFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Delete a feature (requires admin credentials)
     */
    static deleteFeature(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default FeaturesController;
