import { Request, Response, NextFunction } from 'express';
import { CmsService } from './cms.service';
import { ApiResponse } from '../../utils/apiResponse';

export class CmsController {
  /**
   * Get a CMS setting by key
   */
  static async getSetting(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const key = req.params.key as string;
      const data = await CmsService.getSetting(key);
      ApiResponse.success(res, `CMS setting '${key}' retrieved successfully.`, data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a CMS setting by key (Admin only)
   */
  static async updateSetting(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const key = req.params.key as string;
      const data = await CmsService.updateSetting(key, req.body);
      ApiResponse.success(res, `CMS setting '${key}' updated successfully.`, data);
    } catch (error) {
      next(error);
    }
  }
}
export default CmsController;
