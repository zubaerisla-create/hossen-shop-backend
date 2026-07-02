"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesController = void 0;
const features_service_1 = require("./features.service");
const apiResponse_1 = require("../../utils/apiResponse");
class FeaturesController {
    /**
     * Get all features
     */
    static async getAllFeatures(_req, res, next) {
        try {
            const features = await features_service_1.FeaturesService.getAllFeatures();
            apiResponse_1.ApiResponse.success(res, 'Features retrieved successfully.', features);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get feature by ID
     */
    static async getFeatureById(req, res, next) {
        try {
            const id = req.params.id;
            const feature = await features_service_1.FeaturesService.getFeatureById(id);
            apiResponse_1.ApiResponse.success(res, 'Feature retrieved successfully.', feature);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Create a homepage marketing feature (requires admin credentials)
     */
    static async createFeature(req, res, next) {
        try {
            const feature = await features_service_1.FeaturesService.createFeature(req.body);
            apiResponse_1.ApiResponse.success(res, 'Feature created successfully.', feature, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update an existing feature (requires admin credentials)
     */
    static async updateFeature(req, res, next) {
        try {
            const id = req.params.id;
            const feature = await features_service_1.FeaturesService.updateFeature(id, req.body);
            apiResponse_1.ApiResponse.success(res, 'Feature updated successfully.', feature);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Delete a feature (requires admin credentials)
     */
    static async deleteFeature(req, res, next) {
        try {
            const id = req.params.id;
            await features_service_1.FeaturesService.deleteFeature(id);
            apiResponse_1.ApiResponse.success(res, 'Feature deleted successfully.', null);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.FeaturesController = FeaturesController;
exports.default = FeaturesController;
//# sourceMappingURL=features.controller.js.map