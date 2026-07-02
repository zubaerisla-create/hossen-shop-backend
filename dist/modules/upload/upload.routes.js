"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = require("./upload.controller");
const auth_1 = require("../../middlewares/auth");
const apiError_1 = require("../../utils/apiError");
const router = (0, express_1.Router)();
// todo Configure Multer with memory storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
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
        }
        else {
            cb(new apiError_1.ApiError(400, 'Only image files are allowed (jpg, jpeg, png, gif, webp, svg).'));
        }
    },
});
// Protect upload endpoint to authenticated admin users
router.post('/', auth_1.authenticate, auth_1.requireAdmin, upload.single('image'), upload_controller_1.UploadController.uploadImage);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map