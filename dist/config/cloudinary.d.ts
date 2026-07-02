import { v2 as cloudinary } from 'cloudinary';
/**
 * Uploads an image buffer to Cloudinary using upload_stream
 * @param fileBuffer Buffer of the image file
 * @param folder Cloudinary folder name (e.g. 'products')
 * @returns Promise resolving to the secure URL of the uploaded image
 */
export declare const uploadImageToCloudinary: (fileBuffer: Buffer, folder?: string) => Promise<string>;
export default cloudinary;
