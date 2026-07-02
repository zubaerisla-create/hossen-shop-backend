"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsController = void 0;
const cms_service_1 = require("./cms.service");
const apiResponse_1 = require("../../utils/apiResponse");
class CmsController {
    /**
     * Get a CMS setting by key
     */
    static async getSetting(req, res, next) {
        try {
            const key = req.params.key;
            const data = await cms_service_1.CmsService.getSetting(key);
            apiResponse_1.ApiResponse.success(res, `CMS setting '${key}' retrieved successfully.`, data);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Update a CMS setting by key (Admin only)
     */
    static async updateSetting(req, res, next) {
        try {
            const key = req.params.key;
            const data = await cms_service_1.CmsService.updateSetting(key, req.body);
            apiResponse_1.ApiResponse.success(res, `CMS setting '${key}' updated successfully.`, data);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CmsController = CmsController;
exports.default = CmsController;
//# sourceMappingURL=cms.controller.js.map