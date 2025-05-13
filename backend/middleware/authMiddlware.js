import { config } from "dotenv";
config();
import JWT from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const userDetails = await JWT.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: userDetails.id,
      fullName: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
      exp: userDetails.exp,
      avatar: userDetails.avatar,
    };
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
  next();
};

export const authorizeRoles =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you have not permission for this work", 400));
    }
    next();
  };
