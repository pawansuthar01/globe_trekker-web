import { Router } from "express";
import {
  favorites_Story,
  GetFeaturedStory,
  getHomeStories,
  getStoriesById,
  GetStory,
  Removed_Story,
} from "../controller/stories.Controller.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";

const story = Router();
story.route("/").get(GetStory);
story.route("/featured").get(GetFeaturedStory);
story.route("/home").get(getHomeStories);
story.route("/:slug").get(getStoriesById);
story
  .route("/favorite/:id")
  .post(isLoggedIn, favorites_Story)
  .delete(isLoggedIn, Removed_Story);
export default story;
