import { Router } from 'express';
import { PaymentsController } from './payments.controller';
import { authenticate } from '../../middlewares/auth';
import { authLimiter } from '../../config/limiter';

const router = Router();

// Secure checkout payment intent creation
router.post('/create-intent', authenticate, authLimiter, PaymentsController.createPaymentIntent);

export default router;
