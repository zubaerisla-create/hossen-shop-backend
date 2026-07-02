import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth';

const router = Router();

// Retrieve dashboard stats for authenticated administrators
router.get('/stats', authenticate, requireAdmin, DashboardController.getStats);

// Send emails to users/subscribers
router.post('/send-email', authenticate, requireAdmin, DashboardController.sendEmail);

export default router;
