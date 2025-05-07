import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

export const uploadToCloudinary = async (file, folder = "About/team") => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: "image",
  });
  await fs.rm(file.path, { force: true }); // Delete temp file
  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};
