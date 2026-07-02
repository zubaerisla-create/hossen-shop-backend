"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersController = void 0;
const partners_service_1 = require("./partners.service");
const apiResponse_1 = require("../../utils/apiResponse");
class PartnersController {
    /**
     * Get all delivery partners
     */
    static async getAllPartners(_req, res, next) {
        try {
            const partners = await partners_service_1.PartnersService.getAllPartners();
            apiResponse_1.ApiResponse.success(res, 'Delivery partners list retrieved successfully.', partners);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Add a delivery partner
     */
    static async addPartner(req, res, next) {
        try {
            const { name, vehicle, email, phone } = req.body;
            if (!name || !vehicle || !email || !phone) {
                res.status(400).json({ success: false, message: 'All partner fields are required.' });
                return;
            }
            const partner = await partners_service_1.PartnersService.addPartner({ name, vehicle, email, phone });
            apiResponse_1.ApiResponse.success(res, 'Delivery partner registered successfully.', partner, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Toggle partner active state
     */
    static async togglePartner(req, res, next) {
        try {
            const id = req.params.id;
            const partner = await partners_service_1.PartnersService.togglePartner(id);
            apiResponse_1.ApiResponse.success(res, 'Delivery partner status updated successfully.', partner);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Delete a partner
     */
    static async deletePartner(req, res, next) {
        try {
            const id = req.params.id;
            await partners_service_1.PartnersService.deletePartner(id);
            apiResponse_1.ApiResponse.success(res, 'Delivery partner deleted successfully.', null);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PartnersController = PartnersController;
exports.default = PartnersController;
//# sourceMappingURL=partners.controller.js.map