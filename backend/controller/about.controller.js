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
    console.log(req.file);
    const {
      title,
      intro,
      mission,
      values,
      join,

      teamDescriptions,
    } = req?.body;
    const existing = await aboutModule.findOne({ key: "About_key" });
    if (!existing) {
      return next(new AppError("No About document found to update", 404));
    }

    let introImage = existing.introImage;

    // If new team images are uploaded, rebuild team array

    if (req.files?.introImage) {
      const image = req.files.introImage[0];

      introImage = "";

      const uploaded = await uploadToCloudinary(image, "About/introImage");

      introImage = uploaded.secure_url;
    }

    existing.title = title || existing.title;
    existing.intro = intro || existing.intro;
    existing.mission = mission ? JSON.parse(mission) : existing.mission;
    existing.values = values ? JSON.parse(values) : existing.values;
    existing.join = join ? JSON.parse(join) : existing.join;
    existing.team = team;
    existing.introImage = introImage;

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
export const newTeamMemberAdd = async (req, res, next) => {
  try {
    const { role, name, description } = req.body;

    if (!name || !role || !description || !req.file) {
      return next(new AppError("all filed is required to new member add", 404));
    }
    let imageUrl = "";
    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file,
        "About/team/imageUrl"
      );
      if (uploaded) {
        imageUrl = uploaded.secure_url;
      } else {
        return next(
          new AppError("something wont wrong to upload image..", 400)
        );
      }
    }
    const about = await aboutModule.findOne({ key: "About_key" });
    about.team.push({
      name: name,
      description: description,
      role: role,
      imageUrl: imageUrl,
    });
    await about.save();
    res.status(200).json({
      success: true,
      message: "successfully new member add...",
      data: about,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const UpdateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.parse;
    if (!id) {
      return next(new AppError("id is required to update team member...", 404));
    }

    const { role, name, descriptions } = req.body;
    const aboutDoc = await aboutModule.findOne({
      key: "About_key",
    });
    if (aboutDoc) {
      return next(new AppError("About document not found", 404));
    }
    const teamMember = aboutDoc.team.find((member) => member.id === id);
    if (!teamMember) {
      return next(new AppError("Team member not found", 404));
    }

    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file,
        "About/team/imageUrl"
      );
      if (uploaded) {
        teamMember.imageUrl = uploaded.secure_url;
      } else {
        return next(
          new AppError("something wont wrong to upload image..", 400)
        );
      }
    }
    if (role) teamMember.role = role;
    if (name) teamMember.name = name;
    if (descriptions) teamMember.descriptions = descriptions;
    await aboutDoc.save();

    res.status(200).json({
      success: true,
      message: "successfully update member ...",
      data: aboutDoc,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const DeleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.parse;
    if (!id) {
      return next(new AppError("id is required to update team member...", 404));
    }

    const aboutDoc = await aboutModule.findOne({
      key: "About_key",
    });
    if (aboutDoc) {
      return next(new AppError("About document not found", 404));
    }
    aboutDoc.team = aboutDoc.team.filter((member) => member.id !== id);

    // Save the updated
    await aboutDoc.save();
    res.status(200).json({
      success: true,
      message: "successfully delete member ...",
      data: aboutDoc,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
