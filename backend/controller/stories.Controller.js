import cloudinary from "cloudinary";
import AppError from "../utils/AppError.js";
import Story from "../module/stories.Module.js";
import User from "../module/user.Module.js";
import { Activity } from "../module/activity.module.js";
export const newStory = async (req, res, next) => {
  try {
    const { fullName, bio, avatar, role } = req.user;
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      featured,

      readTime,
      caption,
    } = req.body;

    if (
      !title ||
      !content ||
      !excerpt ||
      !category ||
      !tags ||
      !featured ||
      !avatar ||
      !fullName ||
      !readTime ||
      !caption
    ) {
      return next(
        new AppError("Upload to stories requires all required data...", 400)
      );
    }

    let coverImage = {};
    if (req.files["coverImage"]) {
      const result = await cloudinary.v2.uploader.upload(
        req.files["coverImage"][0].path,
        {
          folder: "stories/cover",
          transformation: [
            {
              width: 1200,
              height: 675,
              crop: "fill",
              gravity: "auto",
            },
            {
              fetch_format: "webp",
            },
          ],
        }
      );
      coverImage = {
        url: result.secure_url,
        alt: title,
      };
    }

    const images = [];
    if (req.files["image"]) {
      for (let i = 0; i < req.files["image"].length; i++) {
        const file = req.files["image"][i];
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "stories/gallery",
          transformation: [
            {
              width: 1200,
              height: 675,
              crop: "fill",
              gravity: "auto",
            },
            {
              fetch_format: "webp",
            },
          ],
        });

        images.push({
          url: result.secure_url,
          caption: caption[i] || "",
        });
      }
    }

    const story = new Story({
      title,
      content,
      excerpt,
      category,
      tags: typeof tags === "string" ? JSON.parse(tags) : tags,
      featured: featured === "true",
      author: {
        name: fullName,
        avatar: avatar.secure_url,
        bio: bio || "",
      },
      coverImage,
      images,
      readTime,
    });

    await story.save();
    await Activity.create({
      action: "new Story",
      role: role,
      type: "add",
      detail: fullName,
    });
    res.status(201).json({
      success: true,
      message: "Story created successfully.",
      data: story,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const updateStory = async (req, res, next) => {
  try {
    const { fullName, bio, avatar, role } = req.user;
    const story = await Story.findById(req.params.id);
    if (!story) {
      return next(new AppError("Story not found", 404));
    }

    const {
      title,
      content,
      excerpt,
      category,
      tags,
      featured,

      readTime,
      caption,
    } = req.body;

    // Update basic fields if provided
    if (title) story.title = title;
    if (content) story.content = content;
    if (excerpt) story.excerpt = excerpt;
    if (category) story.category = category;
    if (tags) story.tags = typeof tags === "string" ? JSON.parse(tags) : tags;

    if (featured !== undefined) story.featured = featured === "true";
    if (readTime) story.readTime = readTime;

    // Update author
    story.author = {
      name: fullName || story.author.name,
      avatar: avatar.secure_url || story.author.avatar,
      bio: bio || story.author.bio,
    };

    // Update cover image if new one uploaded
    if (req.files?.coverImage) {
      const result = await cloudinary.v2.uploader.upload(
        req.files.coverImage[0].path,
        {
          folder: "stories/cover",
          transformation: [
            { width: 1200, height: 500, crop: "fill" }, // Resize and crop
            { fetch_format: "webp", quality: "auto" }, // Format and quality
          ],
        }
      );
      story.coverImage = {
        url: result.secure_url,
        alt: story.title,
      };
    }
    if (req.body.removedImages) {
      const removedImages = Array.isArray(req.body.removedImages)
        ? req.body.removedImages
        : [req.body.removedImages];

      story.images = story.images.filter(
        (image) => !removedImages.includes(image.url)
      );
    }

    const files = Array.isArray(req.files?.image)
      ? req.files.image
      : req.files?.image
      ? [req.files.image]
      : [];

    const parsedCaptions = (() => {
      try {
        return Array.isArray(caption)
          ? caption
          : typeof caption === "string"
          ? JSON.parse(caption)
          : [];
      } catch (e) {
        return [];
      }
    })();

    for (let i = 0; i < files.length; i++) {
      const result = await cloudinary.v2.uploader.upload(files[i].path, {
        folder: "stories/gallery",
        transformation: [
          { width: 1200, height: 500, crop: "fill" }, // Resize and crop
          { fetch_format: "webp", quality: "auto" }, // Format and quality
        ],
      });

      story.images.push({
        url: result.secure_url,
        caption: parsedCaptions[i] || "",
      });
    }
    if (!files.length && caption && typeof caption === "object") {
      Object.keys(caption).forEach((key) => {
        const index = parseInt(key);
        if (!isNaN(index) && story.images[index]) {
          story.images[index].caption = caption[key];
        }
      });
    }

    await story.save();
    await Activity.create({
      action: "update Story",
      role: role,
      type: "update",
      detail: fullName,
    });
    res.status(200).json({
      success: true,
      message: "Story updated successfully.",
      data: story,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const FeaturedStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to set  Featured_True Story...", 400)
      );
    }

    const story = await Story.findById(id);
    if (!story) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
    if (story.featured) {
      story.featured = false;
    } else {
      story.featured = true;
    }

    await story.save();
    res.status(200).json({
      success: true,
      message: "SuccessFully featured Story...",
      data: story,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const deleteStory = async (req, res, next) => {
  try {
    const { role, fullName } = req.user;
    const { id } = req.params;
    if (!id) {
      return next(new AppError("Id is required to delete story...", 400));
    }
    await Story.findByIdAndDelete(id);
    await Activity.create({
      action: "Delete Story",
      role: role,
      type: "Delete",
      detail: fullName,
    });
    res.status(200).json({
      success: true,
      message: "SuccessFully Delete Story...",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const GetFeaturedStory = async (req, res, next) => {
  try {
    const stories = await Story.find({ featured: true });
    const storiesCount = await Story.countDocuments({ featured: true });
    if (!stories) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
    res.status(200).json({
      success: true,
      message: "SuccessFully Get Featured  Story...",
      data: stories,
      count: storiesCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const GetStory = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 25);
    const skip = (page - 1) * limit;

    const [stories, storiesCount, storiesFeaturedCount] = await Promise.all([
      Story.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Story.countDocuments({}),
      Story.countDocuments({ featured: true }),
    ]);

    res.status(200).json({
      success: true,
      message: "Successfully retrieved stories.",
      page,
      limit,
      totalPages: Math.ceil(storiesCount / limit),
      data: stories,
      count: storiesCount,
      featuredCount: storiesFeaturedCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const fetchAdminStories = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 25);
    const skip = (page - 1) * limit;

    const [stories, storiesCount, storiesFeaturedCount] = await Promise.all([
      Story.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Story.countDocuments({}),
      Story.countDocuments({ featured: true }),
    ]);

    res.status(200).json({
      success: true,
      message: "Successfully retrieved stories.",
      page,
      limit,
      totalPages: Math.ceil(storiesCount / limit),
      data: stories,
      count: storiesCount,
      featuredCount: storiesFeaturedCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getStoriesById = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return next(new AppError("slug are required to get Story...", 400));
    }
    const story = await Story.findOne({ slug: slug });
    if (!story) {
      return next(new AppError("story not found...", 404));
    }
    res.status(200).json({
      success: true,
      message: "successFully get story...",
      data: story,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const getHomeStories = async (req, res) => {
  try {
    const featuredStories = await Story.find({ featured: true })
      .sort({ createdAt: -1 }) // latest first
      .limit(2);

    const normalStories = await Story.find({ featured: false })
      .sort({ createdAt: -1 }) // latest first
      .limit(6);
    const data = [...featuredStories, ...normalStories];

    res.status(200).json({
      success: true,
      message: "successfully get home stories...",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch stories" });
  }
};

export const favorites_Story = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storyId = req.params.id;

    const user = await User.findById(userId);

    if (!user.favoriteStories.includes(storyId)) {
      user.favoriteStories.push(storyId);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Story added to favorites",
      data: user?.favoriteStories,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const Removed_Story = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.favoriteStories = user.favoriteStories.filter(
      (id) => id.toString() !== req.params.id
    );
    await user.save();
    return res.json({
      success: true,
      message: "Removed from favorites",
      data: user?.favoriteStories,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
