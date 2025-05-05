import destinationModule from "../module/destinationModule.js";
import AppError from "../utils/AppError.js";
import cloudinary from "cloudinary";

export const newDestination = async (req, res, next) => {
  try {
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
      climateType,
      bestMonth,
      featured,
      createdBy,
      isPublished,
      itinerary, // Array of objects: [{ day, title, activities }]
    } = req.body;
    if (
      !description ||
      !name ||
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
      !createdBy ||
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
      bestTimeToVisit,
      tags: typeof tags === "string" ? JSON.parse(tags) : tags,
      popularFor:
        typeof popularFor === "string" ? JSON.parse(popularFor) : popularFor,
      travelTips:
        typeof travelTips === "string" ? JSON.parse(travelTips) : travelTips,
      featured: featured === "true",
      isPublished: isPublished === "true",
      createdBy,
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
