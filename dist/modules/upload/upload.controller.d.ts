import { Request, Response, NextFunction } from 'express';
export declare class UploadController {
    /**
     * Upload an image file to Cloudinary and return the secure URL
     */
    static uploadImage(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default UploadController;
