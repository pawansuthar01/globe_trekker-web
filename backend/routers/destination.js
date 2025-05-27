import { Router } from "express";
import {
  addReview,
  favorites_Destination,
  getAllDestination,
  getDestination,
  getDestinationById,
  getFeaturedDestination,
  getPublishedDestination,
  Removed_Destination,
  RemoveToSaveDestination,
  saveDestination,
  updateReview,
} from "../controller/destination.Controller.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";

const destination = Router();
destination.route("/add-review/:id").post(isLoggedIn, addReview);
destination.route("/update-review/:destinationId/:reviewId").put(updateReview);
destination.route("/save/:destinationId/:userId").put(saveDestination);
destination
  .route("/remove/:destinationId/:userId")
  .put(RemoveToSaveDestination);
destination.get("/admin", getAllDestination);
destination.get("/", getDestination);
destination.get("/featured", getFeaturedDestination);
destination.get("/:id", getDestinationById);
destination.get("/published", getPublishedDestination);
destination
  .route("/favorite/:id")
  .post(isLoggedIn, favorites_Destination)
  .delete(isLoggedIn, Removed_Destination);
export default destination;
