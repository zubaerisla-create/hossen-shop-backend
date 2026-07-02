import { Router } from 'express';
import { PartnersController } from './partners.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth';

const router = Router();

// Protect all delivery partner routes to admin only
router.use(authenticate, requireAdmin);

router.get('/', PartnersController.getAllPartners);
router.post('/', PartnersController.addPartner);
router.put('/:id/toggle', PartnersController.togglePartner);
router.delete('/:id', PartnersController.deletePartner);

export default router;
