import { Request, Response, NextFunction } from 'express';
import { uploadImageToCloudinary } from '../../config/cloudinary';
import { ApiResponse } from '../../utils/apiResponse';
import { ApiError } from '../../utils/apiError';

export class UploadController {
  /**
   * Upload an image file to Cloudinary and return the secure URL
   */
  static async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        throw ApiError.badRequest('No file uploaded. Please provide an image file under the "image" field.');
      }

      // Upload file buffer to Cloudinary
      const imageUrl = await uploadImageToCloudinary(req.file.buffer, 'hossen-shop');

      ApiResponse.success(
        res,
        'Image uploaded successfully.',
        { url: imageUrl },
        201
      );
    } catch (error) {
      next(error);
    }
  }
}
export default UploadController;
