import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';

export class FeaturesService {
  /**
   * Fetch all features
   */
  static async getAllFeatures() {
    return prisma.feature.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Fetch a single feature by ID
   */
  static async getFeatureById(id: string) {
    const feature = await prisma.feature.findUnique({
      where: { id },
    });

    if (!feature) {
      throw ApiError.notFound(`Feature with ID ${id} not found.`);
    }

    return feature;
  }

  /**
   * Create a feature
   */
  static async createFeature(data: { title: string; subtitle: string; iconName: string }) {
    return prisma.feature.create({
      data,
    });
  }

  /**
   * Update an existing feature
   */
  static async updateFeature(
    id: string,
    data: { title?: string; subtitle?: string; iconName?: string }
  ) {
    await this.getFeatureById(id);

    return prisma.feature.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a feature
   */
  static async deleteFeature(id: string) {
    await this.getFeatureById(id);
    return prisma.feature.delete({
      where: { id },
    });
  }
}
export default FeaturesService;
