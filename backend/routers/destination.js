import { Router } from "express";
import {
  addReview,
  getAllDestination,
  getDestination,
  getDestinationById,
  getFeaturedDestination,
  getPublishedDestination,
  RemoveToSaveDestination,
  saveDestination,
  updateReview,
} from "../controller/destination.Controller.js";

const destination = Router();
destination.route("/add-review/:id").post(addReview);
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
export default destination;
