import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  description: String,
  imageUrl: String,
});

const AboutSchema = new mongoose.Schema(
  {
    title: String,
    intro: String,
    mission: [String],
    values: [
      {
        icon: String,
        title: String,
        description: String,
      },
    ],
    team: [TeamMemberSchema],
    join: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
