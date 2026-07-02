import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';

export class CategoriesService {
  /**
   * Retrieve all categories from the database
   */
  static async getAllCategories() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Retrieve a single category by its ID
   */
  static async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw ApiError.notFound(`Category with ID ${id} not found.`);
    }

    return category;
  }

  /**
   * Create a new category
   */
  static async createCategory(data: { name: string; image: string }) {
    // Check if category name is already taken
    const existingCategory = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (existingCategory) {
      throw ApiError.conflict(`Category with name "${data.name}" already exists.`);
    }

    return prisma.category.create({
      data,
    });
  }

  /**
   * Update an existing category
   */
  static async updateCategory(id: string, data: { name?: string; image?: string }) {
    // Ensure category exists
    await this.getCategoryById(id);

    if (data.name) {
      const duplicate = await prisma.category.findFirst({
        where: {
          name: data.name,
          id: { not: id },
        },
      });

      if (duplicate) {
        throw ApiError.conflict(`Category with name "${data.name}" already exists.`);
      }
    }

    return prisma.category.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete an existing category and cascade products
   */
  static async deleteCategory(id: string) {
    await this.getCategoryById(id);
    return prisma.category.delete({
      where: { id },
    });
  }
}
export default CategoriesService;
