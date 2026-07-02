"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("./products.service");
const apiResponse_1 = require("../../utils/apiResponse");
class ProductsController {
    /**
     * Get all products (supports searching, filtering by category, price caps, sorting, and pagination)
     */
    static async getAllProducts(req, res, next) {
        try {
            // Inputs are already validated and coerced by getProductsQuerySchema middleware
            const query = req.query;
            const { products, totalItems } = await products_service_1.ProductsService.getAllProducts({
                search: query.search,
                categoryId: query.categoryId,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                page: query.page,
                limit: query.limit,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            });
            apiResponse_1.ApiResponse.paginated(res, 'Products retrieved successfully.', products, query.page, query.limit, totalItems);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get product by ID
     */
    static async getProductById(req, res, next) {
        try {
            const id = req.params.id;
            const product = await products_service_1.ProductsService.getProductById(id);
            apiResponse_1.ApiResponse.success(res, 'Product retrieved successfully.', product);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Create a new product (requires admin credentials)
     */
    static async createProduct(req, res, next) {
        try {
            const product = await products_service_1.ProductsService.createProduct(req.body);
            apiResponse_1.ApiResponse.success(res, 'Product created successfully.', product, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update an existing product (requires admin credentials)
     */
    static async updateProduct(req, res, next) {
        try {
            const id = req.params.id;
            const product = await products_service_1.ProductsService.updateProduct(id, req.body);
            apiResponse_1.ApiResponse.success(res, 'Product updated successfully.', product);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Delete a product (requires admin credentials)
     */
    static async deleteProduct(req, res, next) {
        try {
            const id = req.params.id;
            await products_service_1.ProductsService.deleteProduct(id);
            apiResponse_1.ApiResponse.success(res, 'Product deleted successfully.', null);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductsController = ProductsController;
exports.default = ProductsController;
//# sourceMappingURL=products.controller.js.map