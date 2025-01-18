import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// TO-DO: to be modified
const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (!localFilePath) return null;
    // upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // file uploaded
    fs.unlinkSync(localFilePath);
    return response;
  } catch {
    // removing the locally saved file
    fs.unlinkSync(localFilePath);
  }
};

export default uploadOnCloudinary;
