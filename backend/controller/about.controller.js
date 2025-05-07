import aboutModule from "../module/about.Module.js";
import AppError from "../utils/AppError.js";
import { uploadToCloudinary } from "../utils/cloudnary.js";

export const addAbout = async (req, res, next) => {
  try {
    const {
      title,
      intro,
      mission,
      values,
      join,
      teamNames,
      teamRoles,
      teamDescriptions,
    } = req.body;

    if (
      !title ||
      !intro ||
      !mission ||
      !values ||
      !join ||
      !req.files?.teamImages
    ) {
      return next(
        new AppError("All about fields and team images are required", 400)
      );
    }

    // Ensure arrays are parsed correctly
    const missionData = JSON.parse(mission);
    const valuesData = JSON.parse(values);
    const joinData = JSON.parse(join);
    const names = Array.isArray(teamNames) ? teamNames : [teamNames];
    const roles = Array.isArray(teamRoles) ? teamRoles : [teamRoles];
    const descriptions = Array.isArray(teamDescriptions)
      ? teamDescriptions
      : [teamDescriptions];
    const imageFiles = req.files.teamImages;

    if (
      names.length !== imageFiles.length ||
      roles.length !== imageFiles.length ||
      descriptions.length !== imageFiles.length
    ) {
      return next(new AppError("Mismatch between team fields and images", 400));
    }

    const team = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const uploaded = await uploadToCloudinary(imageFiles[i], "About/team");

      team.push({
        name: names[i],
        role: roles[i],
        description: descriptions[i],
        imageUrl: uploaded.secure_url,
      });
    }

    const aboutData = new aboutModule({
      title,
      intro,
      mission: missionData,
      values: valuesData,
      join: joinData,
      team,
    });

    await aboutData.save();

    res.status(201).json({
      success: true,
      message: "About section added successfully",
      data: aboutData,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const updateAbout = async (req, res, next) => {
  try {
    const {
      title,
      intro,
      mission,
      values,
      join,
      teamNames,
      teamRoles,
      teamDescriptions,
    } = req.body;

    const existing = await aboutModule.findOne({ key: "About_key" });
    if (!existing) {
      return next(new AppError("No About document found to update", 404));
    }

    let team = existing.team;

    // If new team images are uploaded, rebuild team array
    if (req.files?.teamImages) {
      const images = req.files.teamImages;
      team = [];

      for (let i = 0; i < images.length; i++) {
        const uploaded = await uploadToCloudinary(images[i], "About/team");
        team.push({
          name: teamNames[i],
          role: teamRoles[i],
          description: teamDescriptions[i],
          imageUrl: uploaded.secure_url,
        });
      }
    }

    existing.title = title || existing.title;
    existing.intro = intro || existing.intro;
    existing.mission = mission ? JSON.parse(mission) : existing.mission;
    existing.values = values ? JSON.parse(values) : existing.values;
    existing.join = join ? JSON.parse(join) : existing.join;
    existing.team = team;

    await existing.save();

    res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: existing,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getAbout = async (req, res, next) => {
  try {
    const about = await aboutModule.findOne({ key: "About_key" });

    if (!about) {
      return next(new AppError("About content not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "About content fetched successfully",
      data: about,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
