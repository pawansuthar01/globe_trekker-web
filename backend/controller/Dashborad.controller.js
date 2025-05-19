import aboutModule from "../module/about.Module.js";
import { Activity } from "../module/activity.module.js";
import Banner from "../module/banner.Module.js";
import destinationModule from "../module/destination.Module.js";
import Highlight from "../module/highlight.Module.js";
import Story from "../module/stories.Module.js";
import User from "../module/user.Module.js";
import userContact from "../module/UserContact.Module.js";
import AppError from "../utils/AppError.js";

export const DashboardDetails = async (req, res, next) => {
  try {
    const [
      storiesCount,
      destinationCount,
      highlightCount,

      userCount,
      lastActivity,
      unReadMessage,
      teamMember,
      activeBanner,
    ] = await Promise.all([
      Story.countDocuments({}),
      destinationModule.countDocuments({}),
      Highlight.countDocuments({}),
      User.countDocuments({}),
      Activity.findOne().sort({ createdAt: -1 }),

      userContact.countDocuments({ read: false }),
      aboutModule.findOne({ key: "About_key" }),
      Banner.countDocuments({ active: true }),
    ]);
    res.status(200).json({
      success: true,
      storiesCount,
      destinationCount,
      highlightCount,

      userCount,
      lastActivity: lastActivity.time,
      unReadMessage,
      teamMember: teamMember.team,
      activeBanner,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
