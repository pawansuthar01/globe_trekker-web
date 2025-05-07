import mongoose from "mongoose";
import slugify from "slugify";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    excerpt: { type: String },
    content: { type: String },

    type: { type: String, default: "Story" },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    featured: { type: Boolean, default: false },

    author: {
      name: String,
      avatar: String,
      bio: String,
    },

    coverImage: {
      url: String,
      alt: String,
    },

    images: [
      {
        url: String,
        caption: String,
      },
    ],

    publishedAt: { type: Date, default: Date.now },
    date: { type: String },
    readTime: { type: String },
  },
  { timestamps: true }
);

// Auto-generate slug
storySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Compound index for efficient search
storySchema.index({
  title: "text",
  content: "text",
  excerpt: "text",
  category: "text",
  tags: "text",
});

const Story = mongoose.model("Story", storySchema);

export default Story;
