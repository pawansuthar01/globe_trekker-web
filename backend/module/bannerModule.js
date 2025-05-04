import mongoose from "mongoose";

const BannerModule = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    smallDescription: { type: String, required: true },
    images: {
      type: [
        {
          public_id: String,
          secure_url: { type: String, required: true },
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
    },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
function arrayLimit(val) {
  return val.length <= 3;
}
const Banner = mongoose.model("Banner", BannerModule);
export default Banner;
