import express from "express";
import {
  searchDestinations,
  searchDestinationsAndStories,
  searchHighlights,
  searchStories,
  suggestSearchKeywords,
} from "../controller/search.controller.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";

const search = express.Router();

search.get("/", searchDestinationsAndStories); // /api/search?keyword=...
search.get("/highlights", searchHighlights); // /api/search/highlights?keyword=...
search.get("/destinations", searchDestinations); // /api/search/highlights?keyword=...
search.get("/stories", searchStories); // /api/search/highlights?keyword=...
search.get("/suggest", suggestSearchKeywords); // /api/search/suggest?q=...

export default search;
