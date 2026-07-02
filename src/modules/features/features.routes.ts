import { Router } from 'express';
import { FeaturesController } from './features.controller';
import { validate } from '../../middlewares/validate';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import {
  createFeatureSchema,
  updateFeatureSchema,
  featureIdSchema,
} from './features.validation';

const router = Router();

// Public routes
router.get('/', FeaturesController.getAllFeatures);
router.get('/:id', validate(featureIdSchema), FeaturesController.getFeatureById);

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createFeatureSchema),
  FeaturesController.createFeature
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateFeatureSchema),
  FeaturesController.updateFeature
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validate(featureIdSchema),
  FeaturesController.deleteFeature
);

export default router;
