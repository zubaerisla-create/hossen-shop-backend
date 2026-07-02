"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class CategoriesService {
    /**
     * Retrieve all categories from the database
     */
    static async getAllCategories() {
        return database_1.prisma.category.findMany({
            orderBy: { name: 'asc' },
        });
    }
    /**
     * Retrieve a single category by its ID
     */
    static async getCategoryById(id) {
        const category = await database_1.prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
        if (!category) {
            throw apiError_1.ApiError.notFound(`Category with ID ${id} not found.`);
        }
        return category;
    }
    /**
     * Create a new category
     */
    static async createCategory(data) {
        // Check if category name is already taken
        const existingCategory = await database_1.prisma.category.findUnique({
            where: { name: data.name },
        });
        if (existingCategory) {
            throw apiError_1.ApiError.conflict(`Category with name "${data.name}" already exists.`);
        }
        return database_1.prisma.category.create({
            data,
        });
    }
    /**
     * Update an existing category
     */
    static async updateCategory(id, data) {
        // Ensure category exists
        await this.getCategoryById(id);
        if (data.name) {
            const duplicate = await database_1.prisma.category.findFirst({
                where: {
                    name: data.name,
                    id: { not: id },
                },
            });
            if (duplicate) {
                throw apiError_1.ApiError.conflict(`Category with name "${data.name}" already exists.`);
            }
        }
        return database_1.prisma.category.update({
            where: { id },
            data,
        });
    }
    /**
     * Delete an existing category and cascade products
     */
    static async deleteCategory(id) {
        await this.getCategoryById(id);
        return database_1.prisma.category.delete({
            where: { id },
        });
    }
}
exports.CategoriesService = CategoriesService;
exports.default = CategoriesService;
//# sourceMappingURL=categories.service.js.map