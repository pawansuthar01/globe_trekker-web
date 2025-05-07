import { Router } from "express";
import { getAbout } from "../controller/about.controller.js";

const about = Router();
about.get("/", getAbout);
export default about;
