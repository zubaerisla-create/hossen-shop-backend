export interface GetProductsFilter {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number;
    limit: number;
    sortBy: 'name' | 'price' | 'rating' | 'createdAt';
    sortOrder: 'asc' | 'desc';
}
export declare class ProductsService {
    /**
     * Fetch a paginated and filtered list of products
     */
    static getAllProducts(filter: GetProductsFilter): Promise<{
        products: ({
            category: {
                name: string;
                id: string;
            };
        } & {
            name: string;
            id: string;
            image: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            ratingCount: number;
            price: number;
            unit: string;
            originalPrice: number | null;
            discount: number | null;
            categoryId: string;
        })[];
        totalItems: number;
    }>;
    /**
     * Fetch a single product by ID
     */
    static getProductById(id: string): Promise<{
        category: {
            name: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        ratingCount: number;
        price: number;
        unit: string;
        originalPrice: number | null;
        discount: number | null;
        categoryId: string;
    }>;
    /**
     * Create a new product
     */
    static createProduct(data: {
        name: string;
        price: number;
        unit: string;
        originalPrice?: number;
        discount?: number;
        image: string;
        categoryId: string;
    }): Promise<{
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        ratingCount: number;
        price: number;
        unit: string;
        originalPrice: number | null;
        discount: number | null;
        categoryId: string;
    }>;
    /**
     * Update an existing product
     */
    static updateProduct(id: string, data: {
        name?: string;
        price?: number;
        unit?: string;
        originalPrice?: number;
        discount?: number;
        image?: string;
        categoryId?: string;
    }): Promise<{
        category: {
            name: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        ratingCount: number;
        price: number;
        unit: string;
        originalPrice: number | null;
        discount: number | null;
        categoryId: string;
    }>;
    /**
     * Delete an existing product
     */
    static deleteProduct(id: string): Promise<{
        name: string;
        id: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        ratingCount: number;
        price: number;
        unit: string;
        originalPrice: number | null;
        discount: number | null;
        categoryId: string;
    }>;
}
export default ProductsService;
