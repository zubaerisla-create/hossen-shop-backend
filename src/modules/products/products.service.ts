import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';
import { Prisma } from '@prisma/client';

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

export class ProductsService {
  /**
   * Fetch a paginated and filtered list of products
   */
  static async getAllProducts(filter: GetProductsFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const sortBy = filter.sortBy || 'createdAt';
    const sortOrder = filter.sortOrder || 'desc';
    const { search, categoryId, minPrice, maxPrice } = filter;
    const skip = (page - 1) * limit;

    // Dynamically build Prisma where filter clause
    const where: Prisma.ProductWhereInput = {};

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
      prisma.product.findMany({
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
      prisma.product.count({ where }),
    ]);

    return { products, totalItems };
  }

  /**
   * Fetch a single product by ID
   */
  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
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
      throw ApiError.notFound(`Product with ID ${id} not found.`);
    }

    return product;
  }

  /**
   * Create a new product
   */
  static async createProduct(data: {
    name: string;
    price: number;
    unit: string;
    originalPrice?: number;
    discount?: number;
    image: string;
    categoryId: string;
    isFlashDeal?: boolean;
    flashLabel?: string;
    flashDiscount?: number;
  }) {
    // Verify that the requested category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw ApiError.badRequest(`Category with ID ${data.categoryId} does not exist.`);
    }

    return prisma.product.create({
      data,
    });
  }

  /**
   * Update an existing product
   */
  static async updateProduct(
    id: string,
    data: {
      name?: string;
      price?: number;
      unit?: string;
      originalPrice?: number;
      discount?: number;
      image?: string;
      categoryId?: string;
      isFlashDeal?: boolean;
      flashLabel?: string;
      flashDiscount?: number;
    }
  ) {
    // Verify that the product itself exists
    await this.getProductById(id);

    // If category is being updated, verify new category exists
    if (data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!categoryExists) {
        throw ApiError.badRequest(`Category with ID ${data.categoryId} does not exist.`);
      }
    }

    return prisma.product.update({
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
  static async deleteProduct(id: string) {
    await this.getProductById(id);
    return prisma.product.delete({
      where: { id },
    });
  }
}
export default ProductsService;
