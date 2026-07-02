export declare class CategoriesService {
    /**
     * Retrieve all categories from the database
     */
    static getAllCategories(): Promise<{
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    /**
     * Retrieve a single category by its ID
     */
    static getCategoryById(id: string): Promise<{
        _count: {
            products: number;
        };
    } & {
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Create a new category
     */
    static createCategory(data: {
        name: string;
        image: string;
    }): Promise<{
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Update an existing category
     */
    static updateCategory(id: string, data: {
        name?: string;
        image?: string;
    }): Promise<{
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Delete an existing category and cascade products
     */
    static deleteCategory(id: string): Promise<{
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export default CategoriesService;
