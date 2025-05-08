import express from "express";
import {
  searchDestinationsAndStories,
  searchHighlights,
  suggestSearchKeywords,
} from "../controller/search.controller.js";

const search = express.Router();

search.get("/", searchDestinationsAndStories); // /api/search?keyword=...
search.get("/highlights", searchHighlights); // /api/search/highlights?keyword=...
search.get("/suggest", suggestSearchKeywords); // /api/search/suggest?q=...

export default search;
