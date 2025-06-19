import Feedback from "../module/feedback.module.js";
import { Activity } from "../module/activity.module.js";

// Add Feedback
export const addFeedback = async (req, res) => {
  try {
    const { name, email, message, ratting, location } = req.body;
    const feedback = new Feedback({
      fullName: name,
      email,
      message,
      ratting: Number(ratting),
      location,
    });

    await feedback.save();
    res
      .status(201)
      .json({ success: true, message: "Feedback added", feedback });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add feedback",
      error: error.message,
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Items per page
    const skip = (page - 1) * limit;

    const totalFeedbacks = await Feedback.countDocuments();
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total: totalFeedbacks,
      page,
      totalPages: Math.ceil(totalFeedbacks / limit),
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedbacks",
      error: error.message,
    });
  }
};

// Delete Feedback by ID (admin only or owner)
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    // Optional: Only allow owner or admin
    if (!["ADMIN", "AUTHOR"].includes(req.user.role)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete feedback",
      error: error.message,
    });
  }
};
