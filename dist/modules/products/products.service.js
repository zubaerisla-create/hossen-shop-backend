"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class ProductsService {
    /**
     * Fetch a paginated and filtered list of products
     */
    static async getAllProducts(filter) {
        const page = filter.page || 1;
        const limit = filter.limit || 10;
        const sortBy = filter.sortBy || 'createdAt';
        const sortOrder = filter.sortOrder || 'desc';
        const { search, categoryId, minPrice, maxPrice } = filter;
        const skip = (page - 1) * limit;
        // Dynamically build Prisma where filter clause
        const where = {};
        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive',
            };
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) {
                where.price.gte = minPrice;
            }
            if (maxPrice !== undefined) {
                where.price.lte = maxPrice;
            }
        }
        // Execute database queries in parallel for high performance
        const [products, totalItems] = await Promise.all([
            database_1.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            database_1.prisma.product.count({ where }),
        ]);
        return { products, totalItems };
    }
    /**
     * Fetch a single product by ID
     */
    static async getProductById(id) {
        const product = await database_1.prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!product) {
            throw apiError_1.ApiError.notFound(`Product with ID ${id} not found.`);
        }
        return product;
    }
    /**
     * Create a new product
     */
    static async createProduct(data) {
        // Verify that the requested category exists
        const categoryExists = await database_1.prisma.category.findUnique({
            where: { id: data.categoryId },
        });
        if (!categoryExists) {
            throw apiError_1.ApiError.badRequest(`Category with ID ${data.categoryId} does not exist.`);
        }
        return database_1.prisma.product.create({
            data,
        });
    }
    /**
     * Update an existing product
     */
    static async updateProduct(id, data) {
        // Verify that the product itself exists
        await this.getProductById(id);
        // If category is being updated, verify new category exists
        if (data.categoryId) {
            const categoryExists = await database_1.prisma.category.findUnique({
                where: { id: data.categoryId },
            });
            if (!categoryExists) {
                throw apiError_1.ApiError.badRequest(`Category with ID ${data.categoryId} does not exist.`);
            }
        }
        return database_1.prisma.product.update({
            where: { id },
            data,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    /**
     * Delete an existing product
     */
    static async deleteProduct(id) {
        await this.getProductById(id);
        return database_1.prisma.product.delete({
            where: { id },
        });
    }
}
exports.ProductsService = ProductsService;
exports.default = ProductsService;
//# sourceMappingURL=products.service.js.map