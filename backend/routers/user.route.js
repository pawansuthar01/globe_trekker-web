import { Router } from "express";
import "../config/passport.js";
import passport from "passport";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  Subscribe,
  UpdateUser,
} from "../controller/user.controller.js";
import { cookieOptions } from "../utils/cookieOption.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";
import upload from "../middleware/multerMiddleware.js";
// Initiate Google Login
const user = Router();
user.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback URL
user.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user;

    const token = user.generate_JWT_TOKEN();
    res.cookie("token", token, cookieOptions);
    res.redirect(`${process.env.FRONTEND_URL}/auth/check-login/${token}`);
  }
);
user.post("/set-cookie/:token", (req, res) => {
  const { token } = req.params;
  console.log(token);
  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "login successFully...",
    user: req.user,
  });
});
// ✅ NEW: Authenticated user info route
user.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      message: "login successFully...",
      user: req.user,
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authenticated", user: null });
  }
});
user.put("/subscribe/:id", Subscribe);
user.get("/getProfile", isLoggedIn, getCurrentUser);
user.post("/login", loginUser);
user.post("/register", registerUser);
user.put("/UpdateProfile", isLoggedIn, upload.single("avatar"), UpdateUser);
export default user;
