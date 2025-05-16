import destinationModule from "../module/destination.Module.js";
import Highlight from "../module/highlight.Module.js";
import searchModule from "../module/search.module.js";
import Story from "../module/stories.Module.js";
import AppError from "../utils/AppError.js";
import { grantAchievement } from "../utils/grantAchievement.js";

export const searchDestinationsAndStories = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const { userId } = req?.user;
    if (!keyword) return next(new AppError("Search keyword is required", 400));

    const regex = new RegExp(keyword, "i");

    // Save keyword
    await searchModule.create({ keyword });

    const filter = { isPublished: true };
    if (userId) {
      await grantAchievement(userId, "SEARCH_USED");
    }

    const destinations = await destinationModule.find({
      ...filter,
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
        { tags: regex },
        { "location.country": regex },
        { "location.region": regex },
        { popularFor: regex },
      ],
    });

    const stories = await Story.find({
      $or: [
        { title: regex },
        { excerpt: regex },
        { content: regex },
        { tags: regex },
        { category: regex },
      ],
    });

    res.status(200).json({
      success: true,
      data: { destinations, stories },
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

// controllers/search.controller.js
export const suggestSearchKeywords = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) return res.json({ success: true, data: [] });

    const regex = new RegExp("^" + q, "i");

    const keywords = await searchModule
      .find({ keyword: regex })
      .sort({ createdAt: -1 })
      .limit(10)
      .distinct("keyword");

    res.status(200).json({ success: true, data: keywords });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

export const searchHighlights = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) return next(new AppError("Search keyword is required", 400));

    const regex = new RegExp(keyword, "i");
    await searchModule.create({ keyword });

    const highlights = await Highlight.find({
      isPublished: true,
      $or: [
        { name: regex },
        { location: regex },
        { region: regex },
        { description: regex },
      ],
    });

    res.status(200).json({
      success: true,
      data: highlights,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

export const searchDestinations = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) return next(new AppError("Search keyword is required", 400));

    const regex = new RegExp(keyword, "i");
    await searchModule.create({ keyword });

    const Destinations = await destinationModule.find({
      isPublished: true,
      $or: [
        { name: regex },
        { location: regex },
        { region: regex },
        { description: regex },
      ],
    });

    res.status(200).json({
      success: true,
      data: Destinations,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

export const searchStories = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword) return next(new AppError("Search keyword is required", 400));

    const regex = new RegExp(keyword, "i");
    await searchModule.create({ keyword });

    const Stories = await Story.find({
      $or: [
        { title: regex },
        { excerpt: regex },
        { location: regex },
        { category: regex },
        { region: regex },
        { tags: regex },
        { content: regex },
      ],
    });

    res.status(200).json({
      success: true,
      data: Stories,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

export const getAllSearchKeywords = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query; // default: page 1, 50 items
    const skip = (Number(page) - 1) * Number(limit);

    const total = await searchModule.countDocuments();
    const keywords = await searchModule
      .find()
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      keywords,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
