"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesService = void 0;
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class FeaturesService {
    /**
     * Fetch all features
     */
    static async getAllFeatures() {
        return database_1.prisma.feature.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    /**
     * Fetch a single feature by ID
     */
    static async getFeatureById(id) {
        const feature = await database_1.prisma.feature.findUnique({
            where: { id },
        });
        if (!feature) {
            throw apiError_1.ApiError.notFound(`Feature with ID ${id} not found.`);
        }
        return feature;
    }
    /**
     * Create a feature
     */
    static async createFeature(data) {
        return database_1.prisma.feature.create({
            data,
        });
    }
    /**
     * Update an existing feature
     */
    static async updateFeature(id, data) {
        await this.getFeatureById(id);
        return database_1.prisma.feature.update({
            where: { id },
            data,
        });
    }
    /**
     * Delete a feature
     */
    static async deleteFeature(id) {
        await this.getFeatureById(id);
        return database_1.prisma.feature.delete({
            where: { id },
        });
    }
}
exports.FeaturesService = FeaturesService;
exports.default = FeaturesService;
//# sourceMappingURL=features.service.js.map