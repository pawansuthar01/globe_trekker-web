import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";
import { activeBannerGet, newBanner } from "../controller/banner.Controller.js";
const banner = Router();
banner.route("/").get(activeBannerGet);
export default banner;
