import { Router } from "express";
import {
  ActiveBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "../controller/bannerController.js";
import upload from "../middleware/multerMiddleware.js";

const Admin = Router();
// < **  Banner routes -- start ** >
Admin.route("/banner/:id")
  .put(upload.array("image", 3), updateBanner)
  .delete(deleteBanner);
Admin.route("/banner").get(getBanner);
Admin.put("/banner-active/:id", ActiveBanner);
// < **  Banner routes -- End ** >
export default Admin;
