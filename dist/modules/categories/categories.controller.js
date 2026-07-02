"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const categories_service_1 = require("./categories.service");
const apiResponse_1 = require("../../utils/apiResponse");
class CategoriesController {
    /**
     * Get all categories
     */
    static async getAllCategories(_req, res, next) {
        try {
            const categories = await categories_service_1.CategoriesService.getAllCategories();
            apiResponse_1.ApiResponse.success(res, 'Categories retrieved successfully.', categories);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get a category by its ID
     */
    static async getCategoryById(req, res, next) {
        try {
            const id = req.params.id;
            const category = await categories_service_1.CategoriesService.getCategoryById(id);
            apiResponse_1.ApiResponse.success(res, 'Category retrieved successfully.', category);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Create a new category (requires admin authentication)
     */
    static async createCategory(req, res, next) {
        try {
            const category = await categories_service_1.CategoriesService.createCategory(req.body);
            apiResponse_1.ApiResponse.success(res, 'Category created successfully.', category, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update an existing category (requires admin authentication)
     */
    static async updateCategory(req, res, next) {
        try {
            const id = req.params.id;
            const category = await categories_service_1.CategoriesService.updateCategory(id, req.body);
            apiResponse_1.ApiResponse.success(res, 'Category updated successfully.', category);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Delete a category (requires admin authentication)
     */
    static async deleteCategory(req, res, next) {
        try {
            const id = req.params.id;
            await categories_service_1.CategoriesService.deleteCategory(id);
            apiResponse_1.ApiResponse.success(res, 'Category deleted successfully.', null);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CategoriesController = CategoriesController;
exports.default = CategoriesController;
//# sourceMappingURL=categories.controller.js.map