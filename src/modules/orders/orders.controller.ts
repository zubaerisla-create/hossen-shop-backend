import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth';
import { OrdersService } from './orders.service';
import { ApiResponse } from '../../utils/apiResponse';
import { ApiError } from '../../utils/apiError';

export class OrdersController {
  /**
   * Submit a new checkout order
   */
  static async createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const order = await OrdersService.createOrder(req.user.id, req.body.items);
      ApiResponse.success(res, 'Order placed successfully.', order, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch all orders placed by the current customer
   */
  static async getMyOrders(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const orders = await OrdersService.getOrdersByUser(req.user.id);
      ApiResponse.success(res, 'Your orders retrieved successfully.', orders);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch a single order's details (restricted to owner or admin)
   */
  static async getOrderById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw ApiError.unauthorized();
      }

      const id = req.params.id as string;
      const isAdmin = req.user.role === 'admin';

      const order = await OrdersService.getOrderById(id, req.user.id, isAdmin);
      ApiResponse.success(res, 'Order details retrieved successfully.', order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch all orders globally (Admin only)
   */
  static async getAllOrders(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await OrdersService.getAllOrders();
      ApiResponse.success(res, 'All orders retrieved successfully.', orders);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update an order's status (Admin only)
   */
  static async updateOrderStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const { status } = req.body;

      const order = await OrdersService.updateOrderStatus(id, status);
      ApiResponse.success(res, 'Order status updated successfully.', order);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Assign a delivery partner to an order (Admin only)
   */
  static async assignDeliveryPartner(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id as string;
      const { partnerName } = req.body;

      const order = await OrdersService.assignDeliveryPartner(id, partnerName);
      ApiResponse.success(res, 'Delivery partner assigned successfully.', order);
    } catch (error) {
      next(error);
    }
  }
}
export default OrdersController;
