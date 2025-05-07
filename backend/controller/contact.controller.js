import Contact from "../module/contact.Module.js";
import AppError from "../utils/AppError.js";

export const addContact = async (req, res, next) => {
  try {
    const contactExists = await Contact.findOne({ key: "Contact_key" });
    if (contactExists) {
      return next(
        new AppError("Contact info already exists. Please update it.", 400)
      );
    }

    const { location, email1, email2, phone, workingHours, followLinks } =
      req.body;

    if (!location || !email1 || !phone || !workingHours || !followLinks) {
      return next(new AppError("All required fields must be provided.", 400));
    }

    const newContact = new Contact({
      location: JSON.parse(location),
      email1,
      email2,
      phone,
      workingHours,
      followLinks: JSON.parse(followLinks),
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact info added successfully",
      data: newContact,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { location, email1, email2, phone, workingHours, followLinks } =
      req.body;

    const updated = await Contact.findOneAndUpdate(
      { key: "Contact_key" },
      {
        location: location ? JSON.parse(location) : undefined,
        email1,
        email2,
        phone,
        workingHours,
        followLinks: followLinks ? JSON.parse(followLinks) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return next(new AppError("Contact data not found to update.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updated,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ key: "Contact_key" });

    if (!contact) {
      return next(new AppError("No contact info found.", 404));
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
