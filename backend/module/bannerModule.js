import mongoose from "mongoose";

const BannerModule = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    smallDescription: { type: String, required: true },
    images: [
      {
        public_id: String,
        secure_url: { type: String, required: true },
      },
    ],
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Banner = mongoose.model("Banner", BannerModule);
export default Banner;
