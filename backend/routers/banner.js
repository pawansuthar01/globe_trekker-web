import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";
import { activeBannerGet, newBanner } from "../controller/bannerController.js";
const banner = Router();
banner
  .route("/")
  .post(upload.array("image", 3), newBanner)
  .get(activeBannerGet);
export default banner;
