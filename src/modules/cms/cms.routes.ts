import { Router } from 'express';
import { CmsController } from './cms.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth';

const router = Router();

// Publicly read CMS pages
router.get('/:key', CmsController.getSetting);

// Admin-only updates
router.put('/:key', authenticate, requireAdmin, CmsController.updateSetting);

export default router;
