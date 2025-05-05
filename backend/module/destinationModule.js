import mongoose from "mongoose";
import slugify from "slugify";
const destinationSchema = new mongoose.Schema(
  {
    type: { type: String, default: "Destination" },
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },

    thumbnail: {
      url: String,
      alt: String,
    },

    images: [
      {
        public_id: String,
        secure_url: String,
      },
    ],

    description: { type: String },
    longDescription: { type: String },

    category: { type: String },
    bestTimeToVisit: { type: String },

    tags: [String],
    popularFor: [String],

    location: {
      country: String,
      region: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },

    rating: {
      value: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    travelTips: [String],

    itinerary: [
      {
        day: Number,
        title: String,
        activities: [String],
      },
    ],

    weatherInfo: {
      avgTemp: String,
      climateType: String,
      bestMonth: String,
    },

    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
// Compound index for efficient search

destinationSchema.index({
  name: "text",
  description: "text",
  longDescription: "text",
  category: "text",
  tags: "text",
  "location.country": "text",
  "location.region": "text",
  popularFor: "text",
});
// save  auto slug url to change destination name or new upload
destinationSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Destination", destinationSchema);
