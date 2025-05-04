import AppError from "../utils/AppError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import Banner from "../module/bannerModule.js";
export const newBanner = async (req, res, next) => {
  const { title, description, smallDescription, active } = req.body;
  if (!title || !description || !smallDescription || !req.files) {
    return next(
      new AppError("banner data is required to upload banner..."),
      402
    );
  }
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = await Promise.all(
        req.files.map(async (file) => {
          const ResatUpload = await cloudinary.v2.uploader.upload(file.path, {
            folder: "Banner",
          });
          await fs.rm(file.path, { force: true });
          return {
            public_id: ResatUpload.public_id,
            secure_url: ResatUpload.secure_url,
          };
        })
      );
    }
    if (!images.length === 0) {
      return next(
        new AppError("Image upload failed. No banner was Create..", 402)
      );
    }
    if (active == true || active == "true") {
      await Banner.updateMany({ active: true }, { $set: { active: false } });
    }
    const banner = new Banner({
      title,
      description,
      smallDescription,
      images,
      active,
    });
    if (!banner) {
      new AppError("something wont wrong, No banner was Create..", 402);
    }

    await banner.save();
    res.status(200).json({
      success: true,
      message: "successfully banner create...",
      data: banner,
    });
  } catch (error) {
    if (req.files) {
      await Promise.all(
        req.files.map((file) => {
          fs.rm(file.path, { force: true });
        })
      );
    }
    return next(new AppError(error.message, 500));
  }
};

export const getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find({});
    const BannerCount = await Banner.countDocuments({});
    res.status(200).json({
      success: true,
      message: "successfully get Banner",
      data: banner,
      count: BannerCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const activeBannerGet = async (req, res, next) => {
  try {
    const banner = await Banner.find({ active: true });

    res.status(200).json({
      success: true,
      message: "successfully active Banner get ",
      data: banner,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
