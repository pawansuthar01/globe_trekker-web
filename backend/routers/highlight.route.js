import { Router } from "express";
import {
  getAllHighlight,
  getFeaturedHighlight,
  getHighlightById,
  getHomeHighlight,
  getPublishedHighlight,
} from "../controller/highlight.controller.js";

const highlight = Router();
highlight.get("/", getAllHighlight);
highlight.get("/featured", getFeaturedHighlight);
highlight.get("/published", getPublishedHighlight);
highlight.get("/home", getHomeHighlight);
highlight.get("/:id", getHighlightById);
export default highlight;
