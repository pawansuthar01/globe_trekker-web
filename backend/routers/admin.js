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
import {
  deleteDestination,
  FeaturedDestination,
  newDestination,
  PublishedDestination,
  updateDestination,
} from "../controller/destinationController.js";
import {
  addHighlight,
  deleteHighlight,
  PublishedHighlight,
  updateHighlight,
} from "../controller/highlight.controller.js";

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
Admin.route("/destination/:id")
  .put(
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "image", maxCount: 5 },
    ]),
    updateDestination
  )
  .delete(deleteDestination);
Admin.route("/destination/featured/:id").put(FeaturedDestination);
Admin.route("/destination/Published/:id").put(PublishedDestination);
// < **  Destination routes -- End newDestination** >
// < **  Destination routes -- End newDestination** >
Admin.route("/highlight").post(
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  addHighlight
);
Admin.route("/highlight/:id")
  .put(
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "image", maxCount: 1 },
    ]),
    updateHighlight
  )
  .delete(deleteHighlight);
Admin.route("/highlight/published/:id").put(PublishedHighlight);
export default Admin;
