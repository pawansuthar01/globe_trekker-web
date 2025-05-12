import { Router } from "express";
import { activeBannerGet } from "../controller/banner.Controller.js";
const banner = Router();
banner.route("/").get(activeBannerGet);
export default banner;
