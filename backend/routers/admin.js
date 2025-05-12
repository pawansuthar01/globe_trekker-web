import { Router } from "express";
import {
  ActiveBanner,
  deleteBanner,
  getBanner,
  newBanner,
  updateBanner,
} from "../controller/banner.Controller.js";
import upload from "../middleware/multerMiddleware.js";
import {
  deleteStory,
  FeaturedStory,
  newStory,
  updateStory,
} from "../controller/stories.Controller.js";
import {
  deleteDestination,
  FeaturedDestination,
  newDestination,
  PublishedDestination,
  updateDestination,
} from "../controller/destination.Controller.js";
import {
  addHighlight,
  deleteHighlight,
  FeaturedHighlight,
  PublishedHighlight,
  updateHighlight,
} from "../controller/highlight.controller.js";
import {
  GetContact,
  markAsReadContact,
} from "../controller/userContact.controller.js";
import {
  addAbout,
  DeleteTeamMember,
  getTeam,
  newTeamMemberAdd,
  updateAbout,
  UpdateTeamMember,
} from "../controller/about.controller.js";
import { addContact, updateContact } from "../controller/contact.controller.js";
import { getAllSearchKeywords } from "../controller/search.controller.js";
import { getAllUser } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";

const Admin = Router();
// < **  Banner routes -- start ** >
Admin.route("/banner/:id")
  .put(upload.array("image", 3), updateBanner)
  .delete(deleteBanner);
Admin.route("/banner").get(getBanner);
Admin.post("/banner/new", upload.array("image", 3), newBanner);
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
Admin.route("/stories/featured/:id").put(FeaturedStory);
// < **  stories routes -- End ** >
// < **   routes -- Start newDestination** >
Admin.route("/destination").post(
  isLoggedIn,
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
// < **   routes -- End Destination** >
// < **   routes -- Start highlight** >
Admin.route("/highlight").post(
  isLoggedIn,
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
Admin.route("/highlight/featured/:id").put(FeaturedHighlight);
Admin.route("/highlight/published/:id").put(PublishedHighlight);
// < **   routes -- End highlight** >
// < **   routes --  UserContact** >
Admin.get("/contact", GetContact);
Admin.put("/contact/:id", markAsReadContact);
// < **   routes --  End-Contact** >
// < **   routes --  Start-About** >
Admin.route("/about")
  .put(
    upload.fields([
      { name: "teamImages", maxCount: 10 },
      { name: "introImage", maxCount: 1 },
    ]),
    updateAbout
  )
  .post(
    upload.fields([
      { name: "teamImages", maxCount: 10 },
      { name: "introImage", maxCount: 1 },
    ]),
    addAbout
  );
Admin.put("/about/team/new", upload.single("image"), newTeamMemberAdd);
Admin.get("/about/team", getTeam);
Admin.put("/about/team/:id", upload.single("image"), UpdateTeamMember);

Admin.delete("/about/team/delete/:id", DeleteTeamMember);
// < **  routes --  End-About** >

// < **   routes -- Start web -contact-del** >
Admin.route("/web-contact").post(addContact).put(updateContact);
// < **   routes -- Start web -contact-del** >

// < **   routes -- Start web -search-del** >
Admin.route("/search").get(getAllSearchKeywords);
// < **   routes -- End web -search-del** >
// < **   routes -- Start web -user** >
Admin.route("/users").get(getAllUser);
// < **   routes -- Start web -User** >
export default Admin;
