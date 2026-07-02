import { Router } from 'express';
import categoryRoutes from '../modules/categories/categories.routes';
import productRoutes from '../modules/products/products.routes';
import featureRoutes from '../modules/features/features.routes';
import orderRoutes from '../modules/orders/orders.routes';
import authRoutes from '../modules/auth/auth.routes';
import cmsRoutes from '../modules/cms/cms.routes';
import newsletterRoutes from '../modules/newsletter/newsletter.routes';
import partnerRoutes from '../modules/partners/partners.routes';
import uploadRoutes from '../modules/upload/upload.routes';
import paymentRoutes from '../modules/payments/payments.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';

const router = Router();

// Mount modules under API namespaces
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/features', featureRoutes);
router.use('/orders', orderRoutes);
router.use('/cms', cmsRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/partners', partnerRoutes);
router.use('/upload', uploadRoutes);
router.use('/payments', paymentRoutes);
router.use('/dashboard', dashboardRoutes);

export default router; // trigger reload env
