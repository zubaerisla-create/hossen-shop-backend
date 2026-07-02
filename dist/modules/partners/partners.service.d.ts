export declare class PartnersService {
    /**
     * Fetch all delivery partners
     */
    static getAllPartners(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        vehicle: string;
        active: boolean;
    }[]>;
    /**
     * Add a new delivery partner
     */
    static addPartner(data: {
        name: string;
        vehicle: string;
        email: string;
        phone: string;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        vehicle: string;
        active: boolean;
    }>;
    /**
     * Toggle a delivery partner's active state
     */
    static togglePartner(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phone: string;
        vehicle: string;
        active: boolean;
    }>;
    /**
     * Delete a delivery partner
     */
    static deletePartner(id: string): Promise<boolean>;
}
export default PartnersService;
