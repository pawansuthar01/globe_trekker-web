import { Activity } from "../module/activity.module.js";
import User from "../module/user.Module.js";
import AppError from "../utils/AppError.js";
import { uploadToCloudinary } from "../utils/cloudnary.js";
import { cookieOptions } from "../utils/cookieOption.js";
import SendEmail from "../utils/SendEmail.js";
import crypto from "crypto";
export const UpdateUser = async (req, res, next) => {
  try {
    const { id, role, fullName } = req.user;
    const { name, email, isSubscribed, phoneNumber } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    if (!id) {
      return next(new AppError("id is required to update user", 404));
    }
    const existingUser = await User.findById(id);

    if (!existingUser) return next(new AppError("user does not found...", 404));
    if (req.file) {
      let avatar = existingUser.avatar;
      const uploadAvatar = await uploadToCloudinary(req.file, "user/avatar");
      if (uploadAvatar) {
        avatar = uploadAvatar.secure_url;
      }
      existingUser.avatar.secure_url = avatar;
    }

    existingUser.fullName = name || existingUser.fullName;
    existingUser.email = lowerCaseEmail || existingUser.email;
    existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
    existingUser.isSubscribed = isSubscribed || existingUser.isSubscribed;
    await existingUser.save();
    await Activity.create({
      action: "Update user Profile",
      role: role,
      type: "update",
      detail: fullName,
    });
    const token = existingUser.generate_JWT_TOKEN();
    res.status(200).json({
      success: true,
      message: "User update successfully",
      AuthenticatorToken: token,
      user: existingUser,
    });
  } catch (error) {
    return next(new AppError(error?.message, 500));
  }
};
export const registerUser = async (req, res, next) => {
  try {
    const { name: fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return next(new AppError("Give all data to register...", 400));
    }
    const lowerCaseEmail = email.toLowerCase();
    let newUser;
    const existingUser = await User.findOne({ email: lowerCaseEmail }).select(
      "+password"
    );
    if (existingUser) {
      if (existingUser.isAccount) {
        return res.status(400).json({ message: "Email already registered" });
      } else {
        existingUser.email = lowerCaseEmail;
        existingUser.password = password;
        existingUser.fullName = fullName;
        newUser = existingUser;
      }
    } else {
      newUser = await User.create({
        fullName,
        email: lowerCaseEmail,
        password,
      });
    }

    const token = newUser.generate_JWT_TOKEN();

    await Activity.create({
      action: "new user Profile",
      role: "USER",
      type: "add",
      detail: fullName,
    });

    // Immediately send response to client
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      AuthenticatorToken: token,
      user: newUser,
    });

    // 🔁 Async background email task
    (async () => {
      try {
        const profileLink = `${process.env.FRONTEND_URL}/profile`;
        const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?id=${newUser._id}`;

        await SendEmail({
          to: lowerCaseEmail,
          userName: fullName,
          subject: "Welcome to Globe Trekker!",
          actionText: "Get Started",
          actionLink: profileLink,
          unsubscribeLink: unsubscribeLink,
          message:
            "Hi and welcome aboard! We're excited to have you as part of our travel community. Start exploring new adventures and destinations today.",
        });
      } catch (emailErr) {
        console.error("❌ Failed to send welcome email:", emailErr.message);
      }
    })();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ email: lowerCaseEmail }).select(
      "+password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return next(new AppError("password not match..."), 401);

    const token = user.generate_JWT_TOKEN();
    res.status(200).json({
      success: true,
      message: "Login successful",
      AuthenticatorToken: token,
      user: user,
    });
    (async () => {
      try {
        const profileLink = `${process.env.FRONTEND_URL}/profile`;
        const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?id=${user._id}`;

        await SendEmail({
          to: lowerCaseEmail,
          userName: user.fullName,
          subject: "Successful Login to Your Globe Trekker Account",
          message: `We noticed a successful login to your account. If this was you, no further action is needed. If you did not log in, please secure your account immediately.`,
          actionText: "Secure Account",
          actionLink: profileLink,
          unsubscribeLink: unsubscribeLink,
        });
      } catch (emailErr) {
        console.error("❌ Failed to send welcome email:", emailErr.message);
      }
    })();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
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
    const token = user.generate_JWT_TOKEN();
    res.status(200).json({
      success: true,
      message: "successFully get profile",
      user,
      AuthenticatorToken: token,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const OtpSendTest = async (req, res, next) => {
  try {
    const { email } = req.params;
    const otp = Math.floor(111111, Math.random(999999));
    await SendEmail({
      to: email,
      subject: "Reset Your Password - Globe Trekker",
      userName: "pawan kumar",
      message: otp,
      actionLink: "",
      actionText: "Reset Password",
      unsubscribeLink: "",
    });
    res?.status(200).json({
      success: true,
      message: "send otp",
    });
  } catch (error) {
    return next(new AppError(error.message));
  }
};
export const checkUserValid = async (req, res, next) => {
  try {
    if (!req.user.id) {
      return next(new AppError("id user does not found...", 404));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("user does not found...", 401));
    }
    const token = user.generate_JWT_TOKEN();
    res.status(200).json({
      success: true,
      message: "successFully login...",
      user,
      AuthenticatorToken: token,
    });
  } catch (error) {
    return next(
      new AppError(error.message || "Fail Login  Please try next time...", 500)
    );
  }
};
// if (profile.fullName && profile.email && profile.avatar && profile.phoneNumber) {
//   await grantAchievement(user._id, "PROFILE_COMPLETE");
// }
export const forgotPassword = async (req, res, next) => {
  const { email } = req.params;
  if (!email) {
    return next(new AppError("email is required to send email...", 404));
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email is not found" });

  const token = await user.generatePasswordResatToken();
  await user.save();
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?id=${user._id}`;
  try {
    await SendEmail({
      to: email,
      subject: "Reset Your Password - Globe Trekker",
      userName: user.fullName,
      message:
        " We received a request to reset your password. ⌛ This link is valid for only 10 minutes. If you did not request this, please ignore this email.",
      actionLink: resetLink,
      actionText: "Reset Password",
      unsubscribeLink,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
  // Send reset link via email here (not included)

  res.status(200).json({
    success: true,
    message: "Reset token sent",
    token,
  });
};
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  }).select("+password");

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = newPassword;
  user.markModified("password");
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  const jwtToken = user.generate_JWT_TOKEN();
  res.status(200).json({
    success: true,
    message: "Password reset successful",
    token: jwtToken,
  });
};
export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch)
    return res.status(400).json({ message: "Old password is incorrect" });

  user.password = req.body.newPassword;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
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

export const SubscribeByEmail = async (req, res, next) => {
  try {
    const email = req.params.email.toLowerCase();

    if (!email) {
      return next(new AppError("email is required to UnSubscribe", 404));
    }
    const userFind = await User.findOne({ email });
    if (userFind) {
      if (userFind?.isSubscribed) {
        return res.status(200).json({
          success: false,
          message: "Email already Subscribe...",
        });
      } else {
        userFind.isSubscribed = true;
        await userFind.save();
        return res.status(200).json({
          success: true,
          message: "successFully Subscribe...",
        });
      }
    }

    if (!userFind) {
      const user = await User.create({
        email: email,
        isSubscribed: true,
        isAccount: false,
      });
      return res?.status(201).json({
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
export const UpdateRoleById = async (req, res, next) => {
  try {
    const { role: requesterRole } = req.user;
    const { id, UpdateRole } = req.query;

    if (!id || !UpdateRole) {
      return next(new AppError("User ID and UpdateRole are required", 400));
    }

    if (requesterRole !== "AUTHOR") {
      return next(new AppError("Only AUTHOR can update roles", 403));
    }

    const validRoles = ["USER", "ADMIN", "AUTHOR"];
    if (!validRoles.includes(UpdateRole)) {
      return next(new AppError("Invalid role provided", 400));
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return next(new AppError("User not found", 404));
    }

    const currentRole = userToUpdate.role;

    // Logic: allowed transitions
    const allowedTransitions = {
      USER: ["ADMIN", "AUTHOR"],
      ADMIN: ["USER", "AUTHOR"],
      AUTHOR: ["USER", "ADMIN"],
    };

    if (
      !allowedTransitions[currentRole] ||
      !allowedTransitions[currentRole].includes(UpdateRole)
    ) {
      return next(
        new AppError(
          `Role change from ${currentRole} to ${UpdateRole} is not allowed.`,
          403
        )
      );
    }

    // Prevent violating role limits
    const adminCount = await User.countDocuments({ role: "ADMIN" });
    const authorCount = await User.countDocuments({ role: "AUTHOR" });

    // if (currentRole === "ADMIN" && UpdateRole !== "ADMIN" && adminCount <= 5) {
    //   return next(
    //     new AppError("There must be at least 5 ADMINs in the system", 403)
    //   );
    // }

    // if (
    //   currentRole === "AUTHOR" &&
    //   UpdateRole !== "AUTHOR" &&
    //   authorCount <= 2
    // ) {
    //   return next(
    //     new AppError("There must be at least 2 AUTHORs in the system", 402)
    //   );
    // }

    userToUpdate.role = UpdateRole;
    await userToUpdate.save();

    // Send email
    const profileLink = `${process.env.FRONTEND_URL}/admin`;
    const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?id=${userToUpdate._id}`;
    await SendEmail({
      to: userToUpdate.email,
      userName: userToUpdate.fullName,
      subject: "Your Globe Trekker Account Role Has Been Updated",
      message: `Hi ${userToUpdate.fullName},\n\nYour account role on Globe Trekker has been updated from ${currentRole} to ${UpdateRole}.`,
      actionText: "Review Account",
      actionLink: profileLink,
      unsubscribeLink,
    });

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: userToUpdate,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
