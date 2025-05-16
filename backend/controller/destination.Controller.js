import destinationModule from "../module/destination.Module.js";
import AppError from "../utils/AppError.js";
import cloudinary from "cloudinary";
/*<=  add =>*/
export const newDestination = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return next(
        new AppError("admin id required to upload  destination...", 404)
      );
    }
    const {
      name,
      description,
      longDescription,
      category,
      bestTimeToVisit,
      tags,
      popularFor,
      country,
      region,
      latitude,
      longitude,
      travelTips,
      avgTemp,
      SuggestedDuration,
      climateType,
      bestMonth,
      featured,

      isPublished,
      itinerary, // Array of objects: [{ day, title, activities }]
    } = req.body;

    if (
      !description ||
      !name ||
      !SuggestedDuration ||
      !bestTimeToVisit ||
      !category ||
      !avgTemp ||
      !country ||
      !region ||
      !travelTips ||
      !longitude ||
      !bestMonth ||
      !climateType ||
      !tags ||
      !latitude ||
      !longDescription ||
      !popularFor ||
      !id ||
      !req.files
    ) {
      return next(
        new AppError("Upload to destination requires all required data...", 400)
      );
    }

    // Handle thumbnail upload
    let thumbnail = {};
    if (req.files["thumbnail"]) {
      const result = await cloudinary.v2.uploader.upload(
        req.files["thumbnail"][0].path,
        {
          folder: "destination/cover",
        }
      );
      thumbnail = {
        url: result.secure_url,
        alt: name,
      };
    }

    // Handle gallery image uploads
    const images = [];
    if (req.files["image"]) {
      for (let file of req.files["image"]) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "destination/gallery",
        });
        images.push({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    }

    const destination = new destinationModule({
      name,
      description,
      longDescription,
      category,
      SuggestedDuration,
      bestTimeToVisit,
      tags: typeof tags === "string" ? JSON.parse(tags) : tags,
      popularFor:
        typeof popularFor === "string" ? JSON.parse(popularFor) : popularFor,
      travelTips:
        typeof travelTips === "string" ? JSON.parse(travelTips) : travelTips,
      featured: featured === "true",
      isPublished: isPublished === "true",
      createdBy: id,
      thumbnail,
      images,
      weatherInfo: {
        avgTemp,
        climateType,
        bestMonth,
      },
      location: {
        country,
        region,
        coordinates: {
          latitude,
          longitude,
        },
      },
      itinerary:
        typeof itinerary === "string" ? JSON.parse(itinerary) : itinerary,
    });

    await destination.save();

    res.status(201).json({
      success: true,
      message: "Destination created successfully.",
      data: destination,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  update =>*/

export const updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await destinationModule.findById(id);
    if (!existing) return next(new AppError("Destination not found", 404));

    const {
      name,
      description,
      longDescription,
      category,
      SuggestedDuration,
      bestTimeToVisit,
      tags,
      popularFor,
      country,
      region,
      latitude,
      longitude,
      travelTips,
      avgTemp,
      climateType,
      bestMonth,
      featured,
      isPublished,
      itinerary,
    } = req.body;

    // Parse stringified arrays if needed
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    const parsedPopularFor =
      typeof popularFor === "string" ? JSON.parse(popularFor) : popularFor;
    const parsedTravelTips =
      typeof travelTips === "string" ? JSON.parse(travelTips) : travelTips;
    const parsedItinerary =
      typeof itinerary === "string" ? JSON.parse(itinerary) : itinerary;

    // Handle thumbnail image
    let thumbnail = existing.thumbnail;
    if (req.files["thumbnail"]) {
      const result = await cloudinary.v2.uploader.upload(
        req.files["thumbnail"][0].path,
        { folder: "destination/cover" }
      );
      thumbnail = {
        url: result.secure_url,
        alt: name,
      };
    }

    // Handle gallery images
    let images = existing.images;
    if (req.body.removedImages) {
      const removedImages = Array.isArray(req.body.removedImages)
        ? req.body.removedImages
        : [req.body.removedImages]; // Handle single image URL or array

      // Just filter the images array in the database to remove the ones with matching URLs
      images = existing.images.filter(
        (image) => !removedImages.includes(image.secure_url)
      );
    }
    if (req.files["image"]) {
      images = []; // Replace old gallery
      for (let file of req.files["image"]) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "destination/gallery",
        });
        images.push({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    }

    // Update fields
    existing.SuggestedDuration =
      SuggestedDuration || existing.SuggestedDuration;
    existing.name = name || existing.name;
    existing.description = description || existing.description;
    existing.longDescription = longDescription || existing.longDescription;
    existing.category = category || existing.category;
    existing.bestTimeToVisit = bestTimeToVisit || existing.bestTimeToVisit;
    existing.tags = parsedTags || existing.tags;
    existing.popularFor = parsedPopularFor || existing.popularFor;
    existing.location = {
      country: country || existing.location.country,
      region: region || existing.location.region,
      coordinates: {
        latitude: latitude || existing.location.coordinates.latitude,
        longitude: longitude || existing.location.coordinates.longitude,
      },
    };
    existing.travelTips = parsedTravelTips || existing.travelTips;
    existing.weatherInfo = {
      avgTemp: avgTemp || existing.weatherInfo.avgTemp,
      climateType: climateType || existing.weatherInfo.climateType,
      bestMonth: bestMonth || existing.weatherInfo.bestMonth,
    };
    existing.featured = featured == "true" || existing.featured;
    existing.isPublished = isPublished == "true" || existing.isPublished;
    existing.thumbnail = thumbnail;
    existing.images = images;
    existing.itinerary = parsedItinerary || existing.itinerary;

    await existing.save();

    res.status(200).json({
      success: true,
      message: "Destination updated successfully.",
      data: existing,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  Review add to destination =>*/

export const addReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id are required to add a review.", 400));
    }
    const { user, userName, rating, comment } = req.body;
    if (Number(rating) > 5 || Number(rating) < 0) {
      return next(
        new AppError(
          "review rating max 5 and min 1 required to update a review.",
          400
        )
      );
    }
    if (!user || !userName || !rating || !comment) {
      return next(
        new AppError("All fields are required to add a review.", 400)
      );
    }

    const destination = await destinationModule.findById(id);
    if (!destination) {
      return next(new AppError("Destination not found.", 404));
    }

    const newReview = {
      user,
      userName,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    destination.reviews.push(newReview);

    // Recalculate average rating and count
    const totalRatings = destination.reviews.reduce(
      (acc, r) => acc + r.rating,
      0
    );
    const ratingCount = destination.reviews.length;

    destination.rating = {
      value: totalRatings / ratingCount,
      count: ratingCount,
    };

    await destination.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviews: destination.reviews,
      rating: destination.rating,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  Review update to destination by destination id and reviewId =>*/

export const updateReview = async (req, res, next) => {
  try {
    const { destinationId, reviewId } = req.params;
    const { user, rating, comment } = req.body;
    if (Number(rating) > 5 || Number(rating) < 0) {
      return next(
        new AppError(
          "review rating max 5 and min 1 required to update a review.",
          400
        )
      );
    }
    if (!user || !rating || !comment) {
      return next(
        new AppError("All fields are required to update a review.", 400)
      );
    }

    const destination = await destinationModule.findById(destinationId);
    if (!destination) {
      return next(new AppError("Destination not found.", 404));
    }

    const review = destination.reviews.id(reviewId);

    if (!review) {
      return next(new AppError("Review by this user not found.", 404));
    }

    review.rating = Number(rating);
    review.comment = comment;
    review.createdAt = new Date();

    const totalRatings = destination.reviews.reduce(
      (acc, r) => acc + r.rating,
      0
    );
    const ratingCount = destination.reviews.length;

    destination.rating = {
      value: totalRatings / ratingCount,
      count: ratingCount,
    };

    await destination.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      reviews: destination.reviews,
      rating: destination.rating,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  get All destination =>*/

export const getAllDestination = async (req, res, next) => {
  try {
    const { page = 1, limit = 25 } = req.query; // default: page 1, 50 items
    const skip = (Number(page) - 1) * Number(limit);
    const Destination = await destinationModule
      .find()
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(Number(limit));
    const DestinationCount = await destinationModule.countDocuments();
    const isPublishedCount = await destinationModule.countDocuments({
      isPublished: true,
    });
    const featuredCount = await destinationModule.countDocuments({
      featured: true,
    });
    res.status(200).json({
      success: true,
      message: "successFully Destination All get...",
      data: Destination,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(DestinationCount / limit),
      DestinationCount: DestinationCount,
      isPublishedCount: isPublishedCount,
      featuredCount: featuredCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const getDestination = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query; // default: page 1, 50 items
    const skip = (Number(page) - 1) * Number(limit);
    const publishedDestinations = await destinationModule
      .find({
        isPublished: true,
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const publishedCount = await destinationModule.countDocuments();
    // Step 3: Response
    res.status(200).json({
      success: true,
      message: "Successfully fetched published destinations.",
      data: publishedDestinations,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(publishedCount / limit),
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  user save the  destination =>*/

// await grantAchievement(userId, "DESTINATION_LIKED");
// await grantAchievement(userId, "FEEDBACK_GIVEN");
export const saveDestination = async (req, res, next) => {
  try {
    const { destinationId, userId } = req.params;
    if (!destinationId || !userId) {
      return next(
        new AppError("destinationId or userId is  required to save...")
      );
    }
    const destination = await destinationModule.findById(destinationId);
    if (!destination) {
      return next(new AppError("Destination not found.", 404));
    }
    const isSave = destination.savedBy.includes(userId);
    if (isSave) {
      return next(new AppError("destination already save...", 400));
    }
    destination.savedBy.push(userId);

    await destination.save();
    res.status(200).json({
      success: true,
      message: "successFully save to add destination..",
      data: destination.savedBy,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  user remove to save =>*/

export const RemoveToSaveDestination = async (req, res, next) => {
  try {
    const { destinationId, userId } = req.params;
    if (!destinationId || !userId) {
      return next(
        new AppError("destinationId or userId is  required to remove...")
      );
    }
    const destination = await destinationModule.findById(destinationId);
    if (!destination) {
      return next(new AppError("Destination not found.", 404));
    }
    const isSave = destination.savedBy.includes(userId);
    if (!isSave) {
      return next(new AppError("destination dose not  save...", 400));
    }
    destination.savedBy = destination.savedBy.filter(
      (id) => id.toString() !== userId
    );

    await destination.save();
    res.status(200).json({
      success: true,
      message: "successFully Remove to save ..",
      data: destination.savedBy,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  delete destination by id =>*/

export const deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id is required to delete destination..", 400));
    }
    const destination = await destinationModule.findByIdAndDelete(id);
    if (!destination) {
      return next(new AppError("Destination not found.", 404));
    }
    res.status(200).json({
      success: true,
      message: "successfully delete destination... ",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  add  Featured  destination by id  `true => false and false => true`   =>*/
export const FeaturedDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to featured   destination...", 400)
      );
    }
    const destination = await destinationModule.findById(id);
    if (!destination) {
      return next(
        new AppError("destination does not found, try next time...", 400)
      );
    }
    if (destination.featured) {
      destination.featured = false;
    } else {
      destination.featured = true;
    }
    await destination.save();

    res.status(200).json({
      success: true,
      message: "SuccessFully featured destination ...",
      data: destination,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  add  published  destination by id `true => false and false => true` =>*/
export const PublishedDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(
        new AppError("Id is required to isPublished   destination...", 400)
      );
    }
    const destination = await destinationModule.findById(id);
    if (!destination) {
      return next(
        new AppError("destination does not found, try next time...", 400)
      );
    }
    if (destination.isPublished) {
      destination.isPublished = false;
    } else {
      destination.isPublished = true;
    }
    await destination.save();

    res.status(200).json({
      success: true,
      message: "SuccessFully isPublished destination ...",
      data: destination,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  get only   Featured destination by true =>*/
export const getFeaturedDestination = async (req, res, next) => {
  try {
    const publishedDestinations = await destinationModule
      .find({
        isPublished: true,
      })
      .sort({ createdAt: -1 })
      .limit(10);
    // Step 2: Unme se featured aur non-featured ko alag kar rahe hain
    const featured = publishedDestinations.filter(
      (dest) => dest.featured === true
    );
    const featuredDestinationCount = await destinationModule.countDocuments({
      isPublished: true,
      featured: true,
    });
    res.status(200).json({
      success: true,
      message: "successfully get All featured destination...",
      data: featured,
      count: featuredDestinationCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
/*<=  get only   Published destination by true =>*/
export const getPublishedDestination = async (req, res, next) => {
  try {
    const publishedDestination = await destinationModule.find({
      isPublished: true,
    });
    const publishedDestinationCount = await destinationModule.countDocuments({
      isPublished: true,
    });
    res.status(200).json({
      success: true,
      message: "successfully get All Published destination...",
      data: publishedDestination,
      count: publishedDestinationCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id are required to get destination...", 400));
    }
    const destination = await destinationModule.findOne({
      _id: id,
      isPublished: true,
    });
    if (!destination) {
      return next(new AppError("destination not found...", 404));
    }
    res.status(200).json({
      success: true,
      message: "successFully get destination...",
      data: destination,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
