import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryConfigurationError extends Error {
   constructor() {
      super(
         'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
      );
      this.name = 'CloudinaryConfigurationError';
   }
}

export async function uploadEventImage(buffer: Buffer): Promise<string> {
   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
   const apiKey = process.env.CLOUDINARY_API_KEY;
   const apiSecret = process.env.CLOUDINARY_API_SECRET;

   if (!cloudName || !apiKey || !apiSecret) {
      throw new CloudinaryConfigurationError();
   }

   cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
   });

   return new Promise((resolve, reject) => {
      cloudinary.uploader
         .upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, result) => {
            if (error) {
               reject(error);
            } else if (!result?.secure_url) {
               reject(new Error('Cloudinary upload did not return a secure image URL'));
            } else {
               resolve(result.secure_url);
            }
         })
         .end(buffer);
   });
}
