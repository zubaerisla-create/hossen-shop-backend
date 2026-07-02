"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const cloudinary_1 = require("../../config/cloudinary");
const apiResponse_1 = require("../../utils/apiResponse");
const apiError_1 = require("../../utils/apiError");
class UploadController {
    /**
     * Upload an image file to Cloudinary and return the secure URL
     */
    static async uploadImage(req, res, next) {
        try {
            if (!req.file) {
                throw apiError_1.ApiError.badRequest('No file uploaded. Please provide an image file under the "image" field.');
            }
            // Upload file buffer to Cloudinary
            const imageUrl = await (0, cloudinary_1.uploadImageToCloudinary)(req.file.buffer, 'hossen-shop');
            apiResponse_1.ApiResponse.success(res, 'Image uploaded successfully.', { url: imageUrl }, 201);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UploadController = UploadController;
exports.default = UploadController;
//# sourceMappingURL=upload.controller.js.map