import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["update", "add", "reply", "Delete"],
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,

      default: "Admin",
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
