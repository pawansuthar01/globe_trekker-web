import { Activity } from "../module/activity.module.js";
import AppError from "../utils/AppError.js";
export const getAllActive = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    // Total number of activities
    const totalCount = await Activity.countDocuments({});

    // Fetch paginated activities
    const activities = await Activity.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      data: activities,
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
