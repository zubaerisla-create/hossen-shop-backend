import { Request, Response, NextFunction } from 'express';
export declare class ProductsController {
    /**
     * Get all products (supports searching, filtering by category, price caps, sorting, and pagination)
     */
    static getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get product by ID
     */
    static getProductById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Create a new product (requires admin credentials)
     */
    static createProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update an existing product (requires admin credentials)
     */
    static updateProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Delete a product (requires admin credentials)
     */
    static deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default ProductsController;
