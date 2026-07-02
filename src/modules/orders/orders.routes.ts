import { Router } from 'express';
import { OrdersController } from './orders.controller';
import { validate } from '../../middlewares/validate';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import { authLimiter } from '../../config/limiter';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdSchema,
} from './orders.validation';

const router = Router();

// All order routes require basic customer authentication
router.use(authenticate);

// Admin-only endpoints (must be declared before /:id to avoid route conflict)
router.get('/all', requireAdmin, OrdersController.getAllOrders);

// Customer endpoints
router.post('/', authLimiter, validate(createOrderSchema), OrdersController.createOrder);
router.get('/my', OrdersController.getMyOrders);
router.get('/:id', validate(orderIdSchema), OrdersController.getOrderById);

// Admin /:id-based endpoints
router.put('/:id/status', requireAdmin, validate(updateOrderStatusSchema), OrdersController.updateOrderStatus);
router.put('/:id/assign', requireAdmin, OrdersController.assignDeliveryPartner);

export default router;
