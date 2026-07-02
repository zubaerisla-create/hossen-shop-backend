"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("./env");
// Configure Cloudinary credentials if provided
if (env_1.env.CLOUDINARY_CLOUD_NAME && env_1.env.CLOUDINARY_API_KEY && env_1.env.CLOUDINARY_API_SECRET) {
    cloudinary_1.v2.config({
        cloud_name: env_1.env.CLOUDINARY_CLOUD_NAME,
        api_key: env_1.env.CLOUDINARY_API_KEY,
        api_secret: env_1.env.CLOUDINARY_API_SECRET,
    });
    console.log('✅ Cloudinary configured successfully.');
}
else {
    console.warn('⚠️ Cloudinary configuration is missing. Image uploads will fail.');
}
/**
 * Uploads an image buffer to Cloudinary using upload_stream
 * @param fileBuffer Buffer of the image file
 * @param folder Cloudinary folder name (e.g. 'products')
 * @returns Promise resolving to the secure URL of the uploaded image
 */
const uploadImageToCloudinary = (fileBuffer, folder = 'hossen-shop') => {
    return new Promise((resolve, reject) => {
        if (!env_1.env.CLOUDINARY_CLOUD_NAME) {
            return reject(new Error('Cloudinary is not configured.'));
        }
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder,
            resource_type: 'auto',
        }, (error, result) => {
            if (error) {
                return reject(error);
            }
            if (!result) {
                return reject(new Error('Cloudinary upload returned empty result.'));
            }
            resolve(result.secure_url);
        });
        uploadStream.end(fileBuffer);
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map