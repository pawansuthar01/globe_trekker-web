import { Router } from "express";
import {
  ActiveBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "../controller/bannerController.js";
import upload from "../middleware/multerMiddleware.js";
import {
  deleteStory,
  Featured_FalseStory,
  Featured_TrueStory,
  newStory,
  updateStory,
} from "../controller/storiesController.js";
import { newDestination } from "../controller/destinationController.js";

const Admin = Router();
// < **  Banner routes -- start ** >
Admin.route("/banner/:id")
  .put(upload.array("image", 3), updateBanner)
  .delete(deleteBanner);
Admin.route("/banner").get(getBanner);
Admin.put("/banner-active/:id", ActiveBanner);
// < **  Banner routes -- End ** >
// < **  stories routes -- Start ** >
Admin.route("/stories").post(
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "image", maxCount: 5 },
  ]),
  newStory
);
Admin.route("/stories/:id")
  .put(
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "image", maxCount: 5 },
    ]),
    updateStory
  )
  .delete(deleteStory);
Admin.route("/stories/featured-false/:id").put(Featured_FalseStory);
Admin.route("/stories/featured-true/:id").put(Featured_TrueStory);
// < **  stories routes -- End ** >
// < **  Destination routes -- Start newDestination** >
Admin.route("/destination").post(
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "image", maxCount: 5 },
  ]),
  newDestination
);
export default Admin;
