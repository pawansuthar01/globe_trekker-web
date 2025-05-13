import userContact from "../module/UserContact.Module.js";
import AppError from "../utils/AppError.js";

// Add a mark as Read
export const markAsReadContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedMessage = await userContact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updatedMessage) {
      return next(new AppError("Message not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedMessage,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
// Add a new contact message
export const addNewContact = async (req, res, next) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const newContact = await userContact.create({
      fullName,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      data: newContact,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const GetContact = async (req, res, next) => {
  try {
    const contact = await userContact.find({});
    const contactCount = await userContact.countDocuments({});
    const contactReadCount = await userContact.countDocuments({ read: true });
    if (!contact) {
      return next(new AppError("Story does not found, try next time...", 400));
    }
    res.status(200).json({
      success: true,
      message: "SuccessFully Get All contact...",
      data: contact,
      count: contactCount,
      ReadCount: contactReadCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
