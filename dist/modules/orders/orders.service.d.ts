interface OrderItemInput {
    productId: string;
    quantity: number;
}
export declare class OrdersService {
    /**
     * Submit a new checkout order under a database transaction
     */
    static createOrder(userId: string, itemsInput: OrderItemInput[], paymentMethod?: string): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                image: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        totalAmount: number;
        deliveryPartner: string | null;
    }>;
    /**
     * Fetch all orders belonging to a customer
     */
    static getOrdersByUser(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                image: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        totalAmount: number;
        deliveryPartner: string | null;
    })[]>;
    /**
     * Fetch all orders globally (Admin only)
     */
    static getAllOrders(): Promise<({
        user: {
            name: string | null;
            id: string;
            email: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                image: string;
                unit: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        totalAmount: number;
        deliveryPartner: string | null;
    })[]>;
    /**
     * Fetch a single order by ID. Restricts access to owner or administrator.
     */
    static getOrderById(id: string, userId: string, isAdmin: boolean): Promise<{
        user: {
            name: string | null;
            id: string;
            email: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                image: string;
                unit: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        totalAmount: number;
        deliveryPartner: string | null;
    }>;
    /**
     * Update order fulfillment status (Admin only)
     */
    static updateOrderStatus(id: string, status: string): Promise<{
        user: {
            name: string | null;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        totalAmount: number;
        deliveryPartner: string | null;
    }>;
    /**
     * Assign a delivery partner to an order (Admin only)
     */
    static assignDeliveryPartner(id: string, partnerName: string): Promise<{
        user: {
            name: string | null;
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        totalAmount: number;
        deliveryPartner: string | null;
    }>;
}
export default OrdersService;
