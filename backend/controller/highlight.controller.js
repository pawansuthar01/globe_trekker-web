import cloudinary from "cloudinary";
import AppError from "../utils/AppError.js";
import Highlight from "../module/highlight.Module.js";
import fs from "fs/promises";
const uploadToCloudinary = async (file, folder) => {
  const result = await cloudinary.v2.uploader.upload(file.path, {
    folder,
    resource_type: file.mimetype.startsWith("video") ? "video" : "image",
  });
  await fs.rm(file.path, { force: true });
  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};

export const addHighlight = async (req, res, next) => {
  const { avatar } = req.user;
  const {
    name,
    isPublished,
    featured,
    date,
    location,
    region,
    description,
    rating,
  } = req.body;

  if (!name || !description || !location || !region || !rating || !req.files) {
    return next(new AppError("highlight data is required to upload..."), 402);
  }
  if (Number(rating) > 5 || Number(rating) < 0) {
    return next(
      new AppError(" rating max 5 and min 1 required to upload.", 400)
    );
  }
  try {
    let image = "";
    let video = "";

    if (req.files.image && req.files.image[0]) {
      const uploaded = await uploadToCloudinary(
        req.files.image[0],
        "Highlight/image"
      );
      image = uploaded.secure_url;
    }

    if (req.files.video && req.files.video[0]) {
      const uploaded = await uploadToCloudinary(
        req.files.video[0],
        "Highlight/video"
      );
      video = uploaded.secure_url;
    }

    const highlight = new Highlight({
      name,
      description,
      isPublished,
      date,
      image,
      featured,
      avatar: avatar.secure_url,
      video,
      location,
      rating,
      region,
    });
    if (!highlight) {
      new AppError("something wont wrong, No highlight was Create..", 402);
    }

    await highlight.save();
    res.status(201).json({
      success: true,
      message: "successfully highlight create...",
      data: highlight,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
// Update Controller
export const updateHighlight = async (req, res, next) => {
  const { id } = req.params;
  const { avatar } = req.user;

  const {
    name,
    featured,
    isPublished,
    date,
    location,
    region,
    description,
    rating,
  } = req.body;
  if (!id) {
    return next(new AppError("highlight update to required id...", 400));
  }
  if (rating) {
    if (Number(rating) > 5 || Number(rating) < 0) {
      return next(new AppError("Rating must be between 0 and 5.", 400));
    }
  }

  try {
    const highlight = await Highlight.findById(id);
    if (!highlight) {
      return next(new AppError("Highlight not found", 404));
    }

    // Upload new image if provided
    if (req.files?.image?.[0]) {
      const uploadedImage = await uploadToCloudinary(
        req.files.image[0],
        "Highlight/image"
      );
      highlight.image = uploadedImage.secure_url;
    }

    // Upload new video if provided
    if (req.files?.video?.[0]) {
      const uploadedVideo = await uploadToCloudinary(
        req.files.video[0],
        "Highlight/video"
      );
      highlight.video = uploadedVideo.secure_url;
    }

    // Update other fields
    highlight.name = name || highlight.name;
    highlight.isPublished = isPublished || highlight.isPublished;
    highlight.featured = featured || highlight.featured;
    highlight.avatar = avatar.secure_url || highlight.avatar;
    highlight.date = date || highlight.date;
    highlight.location = location || highlight.location;
    highlight.region = region || highlight.region;
    highlight.description = description || highlight.description;
    highlight.rating = rating || highlight.rating;

    await highlight.save();

    res.status(200).json({
      success: true,
      message: "Highlight updated successfully.",
      data: highlight,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  add  published  Highlight by id `true => false and false => true` =>*/
export const PublishedHighlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to isPublished   destination...", 400)
      );
    }
    const highlight = await Highlight.findById(id);
    if (!highlight) {
      return next(
        new AppError("highlight does not found, try next time...", 400)
      );
    }
    if (highlight.isPublished) {
      highlight.isPublished = false;
    } else {
      highlight.isPublished = true;
    }
    await highlight.save();

    res.status(200).json({
      success: true,
      message: "SuccessFully isPublished highlight ...",
      data: highlight,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/*<=  get only   Published destination by true =>*/
export const getPublishedHighlight = async (req, res, next) => {
  try {
    const publishedHighlight = await Highlight.find({
      isPublished: true,
    });
    const publishedHighlightCount = await Highlight.countDocuments({
      isPublished: true,
    });
    res.status(200).json({
      success: true,
      message: "successfully get All Published highlight...",
      data: publishedHighlight,
      count: publishedHighlightCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  add  Featured  destination by id  `true => false and false => true`   =>*/
export const FeaturedHighlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to featured   highlight...", 400)
      );
    }
    const highlight = await Highlight.findById(id);
    if (!highlight) {
      return next(
        new AppError("highlight does not found, try next time...", 400)
      );
    }
    if (highlight.featured) {
      highlight.featured = false;
    } else {
      highlight.featured = true;
    }
    await highlight.save();

    res.status(200).json({
      success: true,
      message: "SuccessFully featured highlight ...",
      data: highlight,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  get only   Featured highlight by true =>*/
export const getFeaturedHighlight = async (req, res, next) => {
  try {
    // Get the page and limit from query parameters, with default values
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 30; // Default to 30 items per page if not provided

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch the featured highlights with pagination
    const featuredHighlight = await Highlight.find({ featured: true })
      .skip(skip)
      .limit(limit);

    // Get the total count of featured highlights (no pagination)
    const featuredHighlightCount = await Highlight.countDocuments({
      featured: true,
    });

    // Send the response with the data, count, and pagination info
    res.status(200).json({
      success: true,
      message: "Successfully fetched featured highlights",
      data: featuredHighlight,
      count: featuredHighlightCount,
      totalPages: Math.ceil(featuredHighlightCount / limit),
      currentPage: page,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  get only   Featured highlight by true =>*/
export const getHomeHighlight = async (req, res, next) => {
  try {
    // Fetch the featured highlights with pagination
    const featuredHighlight = await Highlight.find({ featured: true })
      .limit(1)
      .sort({ createdAt: -1 });

    // Send the response with the data, count, and pagination info
    res.status(200).json({
      success: true,
      message: "Successfully fetched featured highlights",
      data: featuredHighlight,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getHighlightById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id are required to get highlight...", 400));
    }
    const highlight = await Highlight.findById(id);
    if (!highlight) {
      return next(new AppError("highlight not found...", 404));
    }
    res.status(200).json({
      success: true,
      message: "successFully get highlight...",
      data: highlight,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  get All Highlight =>*/

export const getAllHighlight = async (req, res, next) => {
  try {
    const highlight = await Highlight.find();
    const highlightCount = await Highlight.countDocuments();
    const isPublishedCount = await Highlight.countDocuments({
      isPublished: true,
    });

    res.status(200).json({
      success: true,
      message: "successFully Highlight All get...",
      data: highlight,
      HighlightCount: highlightCount,
      isPublishedCount: isPublishedCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  delete Highlight by id =>*/

export const deleteHighlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id is required to delete Highlight..", 400));
    }
    const highlight = await Highlight.findByIdAndDelete(id);
    if (!highlight) {
      return next(new AppError("Highlight not found.", 404));
    }
    res.status(200).json({
      success: true,
      message: "successfully delete Highlight... ",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
