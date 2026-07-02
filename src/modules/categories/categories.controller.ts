import { Request, Response, NextFunction } from 'express';
import { CategoriesService } from './categories.service';
import { ApiResponse } from '../../utils/apiResponse';

export class CategoriesController {
  /**
   * Get all categories
   */
  static async getAllCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await CategoriesService.getAllCategories();
      ApiResponse.success(res, 'Categories retrieved successfully.', categories);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a category by its ID
   */
  static async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const category = await CategoriesService.getCategoryById(id);
      ApiResponse.success(res, 'Category retrieved successfully.', category);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new category (requires admin authentication)
   */
  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await CategoriesService.createCategory(req.body);
      ApiResponse.success(res, 'Category created successfully.', category, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an existing category (requires admin authentication)
   */
  static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const category = await CategoriesService.updateCategory(id, req.body);
      ApiResponse.success(res, 'Category updated successfully.', category);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a category (requires admin authentication)
   */
  static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await CategoriesService.deleteCategory(id);
      ApiResponse.success(res, 'Category deleted successfully.', null);
    } catch (error) {
      next(error);
    }
  }
}
export default CategoriesController;
