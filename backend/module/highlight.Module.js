import mongoose from "mongoose";
import slugify from "slugify";

const highlightSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    avatar: { type: String },
    video: { type: String },
    image: { type: String },
    isPublished: { type: Boolean, default: true },
    location: { type: String, index: true },
    region: { type: String, index: true },

    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },

    date: { type: String, default: Date.now },
  },
  { timestamps: true }
);

// Optional full-text index for search
highlightSchema.index({
  name: "text",
  location: "text",
  region: "text",
  description: "text",
});

// Auto-generate slug
highlightSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
const Highlight = mongoose.model("Highlight", highlightSchema);

export default Highlight;
