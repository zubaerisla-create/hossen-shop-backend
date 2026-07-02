import { Router } from 'express';
import { CategoriesController } from './categories.controller';
import { validate } from '../../middlewares/validate';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from './categories.validation';

const router = Router();

// Public routes
router.get('/', CategoriesController.getAllCategories);
router.get('/:id', validate(categoryIdSchema), CategoriesController.getCategoryById);

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createCategorySchema),
  CategoriesController.createCategory
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateCategorySchema),
  CategoriesController.updateCategory
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validate(categoryIdSchema),
  CategoriesController.deleteCategory
);

export default router;
