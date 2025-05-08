import User from "../module/user.Module.js";
import AppError from "../utils/AppError.js";
import { cookieOptions } from "../utils/cookieOption.js";

export const registerController = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  const token = newUser.generate_JWT_TOKEN();
  res.cookie("token", token, cookieOptions);
  res.status(201).json({
    success: true,
    message: "User registered successfully",

    data: newUser,
  });
};
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError("password not match..."), 401);

  const token = user.generate_JWT_TOKEN();
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    message: "Login successful",
    token,
    data: user,
  });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user.id) {
      return next(new AppError("id user does not found...", 404));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("user does not found...", 404));
    }
    res.status(200).json({ user });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
// if (profile.fullName && profile.email && profile.avatar && profile.phoneNumber) {
//   await grantAchievement(user._id, "PROFILE_COMPLETE");
// }
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = await user.generatePasswordResatToken();
  await user.save();

  // Send reset link via email here (not included)

  res.status(200).json({ message: "Reset token sent", token });
};
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();

  const jwtToken = user.generate_JWT_TOKEN();
  res
    .status(200)
    .json({ message: "Password reset successful", token: jwtToken });
};
export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch)
    return res.status(400).json({ message: "Old password is incorrect" });

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};

export const Subscribe = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("id is required to UnSubscribe", 404));
    }
    const userFind = await User.findById(id);

    if (userFind.isSubscribed) {
      userFind.isSubscribed = false;
      await userFind.save();
      return res.status(200).json({
        success: true,
        message: "successFully unSubscribe...",
      });
    } else {
      userFind.isSubscribed = true;
      await userFind.save();
      return res.status(200).json({
        success: true,
        message: "successFully Subscribe...",
      });
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query; // default: page 1, 50 items
    const skip = (Number(page) - 1) * Number(limit);
    const users = await User.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const usersCount = await User.countDocuments();
    const usersCountSubscribe = await User.countDocuments({
      isSubscribed: true,
    });
    res.status(200).json({
      success: true,
      message: "successFully data get..",
      page: Number(page),
      limit: Number(limit),

      totalPages: Math.ceil(usersCount / limit),
      user: users,
      countOfUser: usersCount,
      UnSubscribeCount: Number(usersCount) - Number(usersCountSubscribe),
      Subscribe: usersCountSubscribe,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
