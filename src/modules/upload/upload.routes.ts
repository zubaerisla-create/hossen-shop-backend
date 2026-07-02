import { Router } from 'express';
import multer from 'multer';
import { UploadController } from './upload.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth';
import { ApiError } from '../../utils/apiError';

const router = Router();

// todo Configure Multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit size to 5MB
  },
  fileFilter: (_req, file, cb) => {
    // Only allow common image formats
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const isMimetype = allowedTypes.test(file.mimetype);
    
    if (isMimetype) {
      cb(null, true);
    } else {
      cb(new ApiError(400, 'Only image files are allowed (jpg, jpeg, png, gif, webp, svg).'));
    }
  },
});

// Protect upload endpoint to authenticated admin users
router.post(
  '/',
  authenticate,
  requireAdmin,
  upload.single('image'),
  UploadController.uploadImage
);

export default router;
