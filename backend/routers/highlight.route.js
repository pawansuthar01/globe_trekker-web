import { Router } from "express";
import {
  getAllHighlight,
  getFeaturedHighlight,
  getHighlightById,
  getPublishedHighlight,
} from "../controller/highlight.controller.js";

const highlight = Router();
highlight.get("/", getAllHighlight);
highlight.get("/featured", getFeaturedHighlight);
highlight.get("/published", getPublishedHighlight);
highlight.get("/:id", getHighlightById);
export default highlight;
