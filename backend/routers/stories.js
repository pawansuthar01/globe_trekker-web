import { Router } from "express";
import {
  GetFeaturedStory,
  getStoriesById,
  GetStory,
} from "../controller/stories.Controller.js";

const story = Router();
story.route("/").get(GetStory);
story.route("/featured").get(GetFeaturedStory);
story.route("/:id").get(getStoriesById);
export default story;
