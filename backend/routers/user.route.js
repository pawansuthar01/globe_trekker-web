import { Router } from "express";
import "../config/passport.js";
import passport from "passport";
import {
  checkUserValid,
  getCurrentUser,
  loginUser,
  registerUser,
  Subscribe,
  UpdateUser,
} from "../controller/user.controller.js";
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
    res.redirect(`${process.env.FRONTEND_URL}/auth/check-login?token=${token}`);
  }
);
// ✅ NEW: Authenticated user info route
user.get("/me", isLoggedIn, checkUserValid);
user.put("/subscribe/:id", Subscribe);
user.get("/getProfile", isLoggedIn, getCurrentUser);
user.post("/login", loginUser);
user.post("/register", registerUser);
user.put("/UpdateProfile", isLoggedIn, upload.single("avatar"), UpdateUser);
export default user;
