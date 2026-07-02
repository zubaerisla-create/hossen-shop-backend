import { Request, Response, NextFunction } from 'express';
import { ProductsService } from './products.service';
import { ApiResponse } from '../../utils/apiResponse';

export class ProductsController {
  /**
   * Get all products (supports searching, filtering by category, price caps, sorting, and pagination)
   */
  static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Inputs are already validated and coerced by getProductsQuerySchema middleware
      const query = req.query as any;

      const { products, totalItems } = await ProductsService.getAllProducts({
        search: query.search,
        categoryId: query.categoryId,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        page: query.page,
        limit: query.limit,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      });

      ApiResponse.paginated(
        res,
        'Products retrieved successfully.',
        products,
        query.page,
        query.limit,
        totalItems
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get product by ID
   */
  static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const product = await ProductsService.getProductById(id);
      ApiResponse.success(res, 'Product retrieved successfully.', product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new product (requires admin credentials)
   */
  static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductsService.createProduct(req.body);
      ApiResponse.success(res, 'Product created successfully.', product, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an existing product (requires admin credentials)
   */
  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const product = await ProductsService.updateProduct(id, req.body);
      ApiResponse.success(res, 'Product updated successfully.', product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a product (requires admin credentials)
   */
  static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      await ProductsService.deleteProduct(id);
      ApiResponse.success(res, 'Product deleted successfully.', null);
    } catch (error) {
      next(error);
    }
  }
}
export default ProductsController;
