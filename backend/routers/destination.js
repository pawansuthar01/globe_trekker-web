import { Router } from "express";
import {
  addReview,
  getAllDestination,
  getFeaturedDestination,
  getPublishedDestination,
  RemoveToSaveDestination,
  saveDestination,
  updateReview,
} from "../controller/destinationController.js";

const destination = Router();
destination.route("/add-review/:id").post(addReview);
destination.route("/update-review/:destinationId/:reviewId").put(updateReview);
destination.route("/save/:destinationId/:userId").put(saveDestination);
destination
  .route("/remove/:destinationId/:userId")
  .put(RemoveToSaveDestination);
destination.get("/", getAllDestination);
destination.get("/published", getPublishedDestination);
destination.get("/featured", getFeaturedDestination);
export default destination;
