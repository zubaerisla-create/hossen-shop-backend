import { Request, Response, NextFunction } from 'express';
export declare class CategoriesController {
    /**
     * Get all categories
     */
    static getAllCategories(_req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Get a category by its ID
     */
    static getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Create a new category (requires admin authentication)
     */
    static createCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update an existing category (requires admin authentication)
     */
    static updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * Delete a category (requires admin authentication)
     */
    static deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default CategoriesController;
