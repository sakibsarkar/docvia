import { v2 as cloudinary } from "cloudinary";
import config from ".";

cloudinary.config({
  cloud_name: config.CD_CLOUD_NAME,
  api_key: config.CD_API_KEY,
  api_secret: config.CD_APP_SECRET,
});
export const uploadToCloudinary = async (filePath: string, folder?: string) => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return result.secure_url;
};

export default cloudinary;
