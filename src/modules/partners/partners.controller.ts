import { Request, Response, NextFunction } from 'express';
import { PartnersService } from './partners.service';
import { ApiResponse } from '../../utils/apiResponse';

export class PartnersController {
  /**
   * Get all delivery partners
   */
  static async getAllPartners(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const partners = await PartnersService.getAllPartners();
      ApiResponse.success(res, 'Delivery partners list retrieved successfully.', partners);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add a delivery partner
   */
  static async addPartner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, vehicle, email, phone } = req.body;
      if (!name || !vehicle || !email || !phone) {
        res.status(400).json({ success: false, message: 'All partner fields are required.' });
        return;
      }

      const partner = await PartnersService.addPartner({ name, vehicle, email, phone });
      ApiResponse.success(res, 'Delivery partner registered successfully.', partner, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Toggle partner active state
   */
  static async togglePartner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const partner = await PartnersService.togglePartner(id);
      ApiResponse.success(res, 'Delivery partner status updated successfully.', partner);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a partner
   */
  static async deletePartner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await PartnersService.deletePartner(id);
      ApiResponse.success(res, 'Delivery partner deleted successfully.', null);
    } catch (error) {
      next(error);
    }
  }
}
export default PartnersController;
