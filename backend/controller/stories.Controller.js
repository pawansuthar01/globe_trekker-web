import cloudinary from "cloudinary";
import AppError from "../utils/AppError.js";
import Story from "../module/stories.Module.js";
export const newStory = async (req, res, next) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      featured,
      authorName,
      authorAvatar,
      authorBio,
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
      !authorAvatar ||
      !authorBio ||
      !authorName ||
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
        name: authorName,
        avatar: authorAvatar,
        bio: authorBio,
      },
      coverImage,
      images,
      readTime,
    });

    await story.save();

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
      authorName,
      authorAvatar,
      authorBio,
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
      name: authorName || story.author.name,
      avatar: authorAvatar || story.author.avatar,
      bio: authorBio || story.author.bio,
    };

    // Update cover image if new one uploaded
    if (req.files?.coverImage) {
      const result = await cloudinary.v2.uploader.upload(
        req.files.coverImage[0].path,
        {
          folder: "stories/cover",
        }
      );
      story.coverImage = {
        url: result.secure_url,
        alt: story.title,
      };
    }

    // Replace full images if new ones uploaded
    if (req.files?.image) {
      story.images = [];
      for (let i = 0; i < req.files.image.length; i++) {
        const result = await cloudinary.v2.uploader.upload(
          req.files.image[i].path,
          {
            folder: "stories/gallery",
          }
        );
        story.images.push({
          url: result.secure_url,
          caption: caption?.[i] || "",
        });
      }
    }

    // ✅ Only update specific captions
    if (!req.files?.image && caption && typeof caption === "object") {
      Object.keys(caption).forEach((key) => {
        const index = parseInt(key);
        if (!isNaN(index) && story.images[index]) {
          story.images[index].caption = caption[key];
        }
      });
    }

    await story.save();

    res.status(200).json({
      success: true,
      message: "Story updated successfully.",
      data: story,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const Featured_FalseStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to set  Featured_False Story...", 400)
      );
    }
    const featured_FalseStory = await Story.findByIdAndUpdate(
      id,
      { $set: { featured: false } },
      { new: true, runValidators: true }
    );

    if (!featured_FalseStory) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
    res.status(200).json({
      success: true,
      message: "SuccessFully featured_False Story...",
      data: featured_FalseStory,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const Featured_TrueStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to set  Featured_True Story...", 400)
      );
    }
    const featured_trueStory = await Story.findByIdAndUpdate(
      id,
      { $set: { featured: true } },
      { new: true, runValidators: true }
    );

    if (!featured_trueStory) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
    res.status(200).json({
      success: true,
      message: "SuccessFully featured_true Story...",
      data: featured_trueStory,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const deleteStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("Id is required to delete story...", 400));
    }
    const DeleteStory = await Story.findByIdAndDelete(id);

    if (!DeleteStory) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
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
    const stories = await Story.find({});
    const storiesCount = await Story.countDocuments({});
    const storiesFeaturedCount = await Story.countDocuments({ featured: true });
    if (!stories) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
    res.status(200).json({
      success: true,
      message: "SuccessFully Get All Story...",
      data: stories,
      count: storiesCount,
      FeaturedCount: storiesFeaturedCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const getStoriesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id are required to get Story...", 400));
    }
    const story = await Story.findById(id);
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
