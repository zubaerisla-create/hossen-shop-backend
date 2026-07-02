import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';

// Configure Cloudinary credentials if provided
if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configured successfully.');
} else {
  console.warn('⚠️ Cloudinary configuration is missing. Image uploads will fail.');
}

/**
 * Uploads an image buffer to Cloudinary using upload_stream
 * @param fileBuffer Buffer of the image file
 * @param folder Cloudinary folder name (e.g. 'products')
 * @returns Promise resolving to the secure URL of the uploaded image
 */
export const uploadImageToCloudinary = (
  fileBuffer: Buffer,
  folder: string = 'hossen-shop'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!env.CLOUDINARY_CLOUD_NAME) {
      return reject(new Error('Cloudinary is not configured.'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Cloudinary upload returned empty result.'));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;
