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
import {
  GetContact,
  markAsReadContact,
} from "../controller/userContact.controller.js";
import { addAbout, updateAbout } from "../controller/about.controller.js";

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
// < **  Destination routes -- End Destination** >
// < **  Destination routes -- Start highlight** >
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
// < **  Destination routes -- End highlight** >
// < **  Destination routes --  UserContact** >
Admin.get("/contact", GetContact);
Admin.put("/contact/:id", markAsReadContact);
// < **  Destination routes --  End-Contact** >
// < **  Destination routes --  End-About** >
Admin.route("/about")
  .put(upload.fields([{ name: "teamImages", maxCount: 10 }]), updateAbout)
  .post(upload.fields([{ name: "teamImages", maxCount: 10 }]), addAbout);
export default Admin;
