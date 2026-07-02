import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { signUpSchema, loginSchema } from './auth.validation';

const router = Router();

// Public routes
router.post('/signup', validate(signUpSchema), AuthController.signUp);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
