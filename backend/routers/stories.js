import { Router } from "express";
import {
  GetFeaturedStory,
  getHomeStories,
  getStoriesById,
  GetStory,
} from "../controller/stories.Controller.js";

const story = Router();
story.route("/").get(GetStory);
story.route("/featured").get(GetFeaturedStory);
story.route("/home").get(getHomeStories);
story.route("/:id").get(getStoriesById);
export default story;
