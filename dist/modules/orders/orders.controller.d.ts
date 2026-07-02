import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth';
export declare class OrdersController {
    /**
     * Submit a new checkout order
     */
    static createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
    /**
     * Fetch all orders placed by the current customer
     */
    static getMyOrders(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
    /**
     * Fetch a single order's details (restricted to owner or admin)
     */
    static getOrderById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
    /**
     * Fetch all orders globally (Admin only)
     */
    static getAllOrders(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
    /**
     * Update an order's status (Admin only)
     */
    static updateOrderStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
    /**
     * Assign a delivery partner to an order (Admin only)
     */
    static assignDeliveryPartner(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
export default OrdersController;
