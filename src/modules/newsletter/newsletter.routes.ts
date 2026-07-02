import { Router } from 'express';
import { NewsletterController } from './newsletter.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import { authLimiter } from '../../config/limiter';

const router = Router();

// Public newsletter signup endpoint
router.post('/subscribe', authLimiter, NewsletterController.subscribe);

// Admin-only list retrieve
router.get('/subscribers', authenticate, requireAdmin, NewsletterController.getAllSubscribers);

export default router;
