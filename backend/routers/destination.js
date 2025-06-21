import { Router } from "express";
import {
  addReview,
  favorites_Destination,
  getAllDestination,
  getDestination,
  getDestinationById,
  getDestinationBySlug,
  getFeaturedDestination,
  getPublishedDestination,
  Removed_Destination,
  RemoveToSaveDestination,
  saveDestination,
  updateReview,
  updateReviewHelp,
  updateReviewUnHelp,
} from "../controller/destination.Controller.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";

const destination = Router();
destination.route("/add-review/:slug").post(isLoggedIn, addReview);
destination
  .route("/review-help/:slug/:reviewId/:isUnHelp")
  .put(updateReviewHelp);
destination
  .route("/review-unHelp/:slug/:reviewId/:isHelp")
  .put(updateReviewUnHelp);
destination.route("/update-review/:destinationId/:reviewId").put(updateReview);
destination.route("/save/:destinationId/:userId").put(saveDestination);
destination
  .route("/remove/:destinationId/:userId")
  .put(RemoveToSaveDestination);
destination.get("/admin", getAllDestination);
destination.get("/", getDestination);
destination.get("/featured", getFeaturedDestination);
destination.get("/:slug", getDestinationBySlug);

destination.get("/published", getPublishedDestination);
destination
  .route("/favorite/:id")
  .post(isLoggedIn, favorites_Destination)
  .delete(isLoggedIn, Removed_Destination);
export default destination;
