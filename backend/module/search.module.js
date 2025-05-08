// models/Search.model.js
import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Search", SearchSchema);
