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

export const updateBanner = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("id is required to update Banner..", 402));
  }
  const { title, description, smallDescription, index } = req.body;

  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return next(new AppError("Banner is not Found, try again...", 402));
    }
    const updateImages = [...banner.images];

    if (req.files && req.files.length > 0) {
      const files = req.files;

      console.log(index);
      console.log(index && Array.isArray(index));
      if (index && Array.isArray(index)) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (index[i] !== undefined) {
            const imageIndex = parseInt(index[i], 10);
            const uploadResult = await cloudinary.v2.uploader.upload(
              file.path,
              {
                folder: "banner",
              }
            );
            await fs.rm(file.path, { force: true });
            updateImages[imageIndex] = {
              public_id: uploadResult.public_id,
              secure_url: uploadResult.secure_url,
            };
          }
        }
      } else if (index !== undefined) {
        for (const file of files) {
          const uploadResult = await cloudinary.v2.uploader.upload(file.path, {
            folder: "banner",
          });

          await fs.rm(file.path, { force: true });

          updateImages[parseInt(index, 10)] = {
            public_id: uploadResult.public_id,
            secure_url: uploadResult.secure_url,
          };
        }
      }
    }
    const updateBanner = {
      ...(title && { title }),
      ...(description && { description }),
      ...(smallDescription && { smallDescription }),
      ...(smallDescription && { smallDescription }),
      images: updateImages,
    };
    const updatedBanner = await Banner.findByIdAndUpdate(id, updateBanner, {
      new: true,
      runValidators: true,
    });
    if (!updateBanner) {
      return next(
        new AppError("Failed to update the Banner. Please try again.", 402)
      );
    }
    res.status(200).json({
      success: true,
      message: "Banner successfully updated.",
      data: updatedBanner,
    });
  } catch (error) {
    if (req.files) {
      fs.rm(file.path, { force: true });
    }

    return next(new AppError(error.message, 500));
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const BannerCount = await Banner.countDocuments({});
    if (BannerCount === 1) {
      return next(new AppError("At least one Banner is required...", 402));
    }
    if (!id) {
      return next(new AppError("id is required to delete Banner..", 402));
    }
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return next(new AppError("banner does not found...", 402));
    }
    res.status(200).json({
      success: true,
      message: "successfully delete Banner",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const ActiveBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id is required to delete Banner..", 402));
    }

    await Banner.updateMany({ active: true }, { $set: { active: false } });

    const activeBanner = await Banner.findByIdAndUpdate(
      id,
      { $set: { active: true } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!activeBanner) {
      return next(
        new AppError(
          "something wont wrong to active banner, try next time...",
          402
        )
      );
    }
    res.status(200).json({
      success: true,
      message: "successfully active Banner",
      data: activeBanner,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find({});
    const BannerCount = await Banner.countDocuments({});
    const activeBannerCount = await Banner.countDocuments({ active: true });
    const inActiveBannerCount = await Banner.countDocuments({ active: false });
    res.status(200).json({
      success: true,
      message: "successfully get Banner",
      data: banner,
      count: BannerCount,
      active: activeBannerCount,
      inactive: inActiveBannerCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
