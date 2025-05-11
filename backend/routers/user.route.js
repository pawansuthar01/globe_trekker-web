import { Router } from "express";
import "../config/passport.js";
import passport from "passport";
import { getCurrentUser, Subscribe } from "../controller/user.controller.js";
import { cookieOptions } from "../utils/cookieOption.js";
import { isLoggedIn } from "../middleware/authMiddlware.js";
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
    res.redirect(`${process.env.FRONTEND_URL}/auth/check-login`);
  }
);
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
export default user;
