import { Request, Response, NextFunction } from 'express';
import { FeaturesService } from './features.service';
import { ApiResponse } from '../../utils/apiResponse';

export class FeaturesController {
  /**
   * Get all features
   */
  static async getAllFeatures(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const features = await FeaturesService.getAllFeatures();
      ApiResponse.success(res, 'Features retrieved successfully.', features);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get feature by ID
   */
  static async getFeatureById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const feature = await FeaturesService.getFeatureById(id);
      ApiResponse.success(res, 'Feature retrieved successfully.', feature);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a homepage marketing feature (requires admin credentials)
   */
  static async createFeature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feature = await FeaturesService.createFeature(req.body);
      ApiResponse.success(res, 'Feature created successfully.', feature, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an existing feature (requires admin credentials)
   */
  static async updateFeature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const feature = await FeaturesService.updateFeature(id, req.body);
      ApiResponse.success(res, 'Feature updated successfully.', feature);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a feature (requires admin credentials)
   */
  static async deleteFeature(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await FeaturesService.deleteFeature(id);
      ApiResponse.success(res, 'Feature deleted successfully.', null);
    } catch (error) {
      next(error);
    }
  }
}
export default FeaturesController;
