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
  fetchAdminStories,
  newStory,
  updateStory,
} from "../controller/stories.Controller.js";
import {
  deleteDestination,
  FeaturedDestination,
  getAllDestination,
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
import { getAllActive } from "../controller/activity.controller.js";
import { DashboardDetails } from "../controller/Dashborad.controller.js";

const Admin = Router();
// < **  Banner routes -- start ** >
Admin.route("/banner/:id")
  .put(isLoggedIn, upload.array("image", 3), updateBanner)
  .delete(isLoggedIn, deleteBanner);
Admin.route("/banner").get(isLoggedIn, getBanner);
Admin.post("/banner/new", isLoggedIn, upload.array("image", 3), newBanner);
Admin.put("/banner-active/:id", isLoggedIn, ActiveBanner);
// < **  Banner routes -- End ** >
// < **  stories routes -- Start ** >
Admin.route("/stories")
  .post(
    isLoggedIn,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "image", maxCount: 5 },
    ]),
    newStory
  )
  .get(isLoggedIn, fetchAdminStories);
Admin.route("/stories/:id")
  .put(
    isLoggedIn,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "image", maxCount: 5 },
    ]),
    updateStory
  )
  .delete(isLoggedIn, deleteStory);
Admin.route("/stories/featured/:id").put(isLoggedIn, FeaturedStory);

// < **  stories routes -- End ** >
// < **   routes -- Start newDestination** >
Admin.route("/destination")
  .post(
    isLoggedIn,
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "image", maxCount: 7 },
    ]),
    newDestination
  )
  .get(isLoggedIn, getAllDestination);
Admin.route("/destination/:id")
  .put(
    isLoggedIn,
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "image", maxCount: 7 },
    ]),
    updateDestination
  )
  .delete(isLoggedIn, deleteDestination);
Admin.route("/destination/featured/:id").put(isLoggedIn, FeaturedDestination);
Admin.route("/destination/Published/:id").put(isLoggedIn, PublishedDestination);
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
    isLoggedIn,
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "image", maxCount: 1 },
    ]),
    updateHighlight
  )
  .delete(isLoggedIn, deleteHighlight);
Admin.route("/highlight/featured/:id").put(isLoggedIn, FeaturedHighlight);
Admin.route("/highlight/published/:id").put(isLoggedIn, PublishedHighlight);
// < **   routes -- End highlight** >
// < **   routes --  UserContact** >
Admin.get("/contact", isLoggedIn, GetContact);
Admin.put("/contact/:id", isLoggedIn, markAsReadContact);
// < **   routes --  End-Contact** >
// < **   routes --  Start-About** >
Admin.route("/about")
  .put(
    isLoggedIn,
    upload.fields([
      { name: "teamImages", maxCount: 10 },
      { name: "introImage", maxCount: 1 },
    ]),
    updateAbout
  )
  .post(
    isLoggedIn,
    upload.fields([
      { name: "teamImages", maxCount: 10 },
      { name: "introImage", maxCount: 1 },
    ]),
    addAbout
  );
Admin.put(
  "/about/team/new",
  isLoggedIn,
  upload.single("image"),
  newTeamMemberAdd
);
Admin.get("/about/team", isLoggedIn, getTeam);
Admin.put(
  "/about/team/:id",
  isLoggedIn,
  upload.single("image"),
  UpdateTeamMember
);

Admin.delete("/about/team/delete/:id", isLoggedIn, DeleteTeamMember);
// < **  routes --  End-About** >

// < **   routes -- Start web -contact-del** >
Admin.route("/web-contact")
  .post(isLoggedIn, addContact)
  .put(isLoggedIn, updateContact);
// < **   routes -- Start web -contact-del** >

// < **   routes -- Start web -search-del** >
Admin.route("/search").get(isLoggedIn, getAllSearchKeywords);
// < **   routes -- End web -search-del** >
// < **   routes -- Start web -user** >
Admin.route("/users").get(isLoggedIn, getAllUser);
// < **   routes -- Start web -User** >
// < **   routes -- Start web -DashboardDetails** >
Admin.route("/").get(isLoggedIn, getAllActive);
Admin.route("/dashboard").get(isLoggedIn, DashboardDetails);
// < **   routes -- Start web -DashboardDetails** >
export default Admin;
