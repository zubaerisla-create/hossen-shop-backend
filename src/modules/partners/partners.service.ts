import { prisma } from '../../config/database';
import { ApiError } from '../../utils/apiError';

export class PartnersService {
  /**
   * Fetch all delivery partners
   */
  static async getAllPartners() {
    return prisma.partner.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Add a new delivery partner
   */
  static async addPartner(data: { name: string; vehicle: string; email: string; phone: string }) {
    const existing = await prisma.partner.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existing) {
      throw new ApiError(400, 'A partner with this email is already registered.');
    }

    return prisma.partner.create({
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
  static async togglePartner(id: string) {
    const partner = await prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new ApiError(404, `Partner with ID ${id} not found.`);
    }

    return prisma.partner.update({
      where: { id },
      data: { active: !partner.active },
    });
  }

  /**
   * Delete a delivery partner
   */
  static async deletePartner(id: string) {
    const partner = await prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new ApiError(404, `Partner with ID ${id} not found.`);
    }

    await prisma.partner.delete({
      where: { id },
    });

    return true;
  }
}
export default PartnersService;
