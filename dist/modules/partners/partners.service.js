"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersService = void 0;
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class PartnersService {
    /**
     * Fetch all delivery partners
     */
    static async getAllPartners() {
        return database_1.prisma.partner.findMany({
            orderBy: { name: 'asc' },
        });
    }
    /**
     * Add a new delivery partner
     */
    static async addPartner(data) {
        const existing = await database_1.prisma.partner.findUnique({
            where: { email: data.email.toLowerCase().trim() },
        });
        if (existing) {
            throw new apiError_1.ApiError(400, 'A partner with this email is already registered.');
        }
        return database_1.prisma.partner.create({
            data: {
                ...data,
                email: data.email.toLowerCase().trim(),
                active: true,
            },
        });
    }
    /**
     * Toggle a delivery partner's active state
     */
    static async togglePartner(id) {
        const partner = await database_1.prisma.partner.findUnique({
            where: { id },
        });
        if (!partner) {
            throw new apiError_1.ApiError(404, `Partner with ID ${id} not found.`);
        }
        return database_1.prisma.partner.update({
            where: { id },
            data: { active: !partner.active },
        });
    }
    /**
     * Delete a delivery partner
     */
    static async deletePartner(id) {
        const partner = await database_1.prisma.partner.findUnique({
            where: { id },
        });
        if (!partner) {
            throw new apiError_1.ApiError(404, `Partner with ID ${id} not found.`);
        }
        await database_1.prisma.partner.delete({
            where: { id },
        });
        return true;
    }
}
exports.PartnersService = PartnersService;
exports.default = PartnersService;
//# sourceMappingURL=partners.service.js.map