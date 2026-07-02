import { Router } from 'express';
import { ProductsController } from './products.controller';
import { validate } from '../../middlewares/validate';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  getProductsQuerySchema,
} from './products.validation';

const router = Router();

// Public routes
router.get('/', validate(getProductsQuerySchema), ProductsController.getAllProducts);
router.get('/:id', validate(productIdSchema), ProductsController.getProductById);

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createProductSchema),
  ProductsController.createProduct
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateProductSchema),
  ProductsController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validate(productIdSchema),
  ProductsController.deleteProduct
);

export default router;
