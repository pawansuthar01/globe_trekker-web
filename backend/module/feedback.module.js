import mongoose, { model } from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    message: { type: String, required: true },
    ratting: { type: Number, required: true },

    email: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);
const Feedback = model("feedback", feedbackSchema);
export default Feedback;
