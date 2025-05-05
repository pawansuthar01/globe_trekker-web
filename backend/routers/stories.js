import { Router } from "express";
import { GetFeaturedStory, GetStory } from "../controller/storiesController.js";

const story = Router();
story.route("/").get(GetStory);
story.route("/featured").get(GetFeaturedStory);
export default story;
