import { Router } from "express";
import "../config/passport.js";
import passport from "passport";
import { Subscribe } from "../controller/user.controller.js";
import { cookieOptions } from "../utils/cookieOption.js";
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

    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);
user.put("/subscribe/:id", Subscribe);
export default user;
