import { config } from "dotenv";
config({ path: ".env" });

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DataBaseConnection } from "./config/DB.js";
import ErrorMiddleware from "./middleware/ErrorMiddleware.js";
import banner from "./routers/banner.js";
import Admin from "./routers/admin.js";
import story from "./routers/stories.js";
import destination from "./routers/destination.js";
import highlight from "./routers/highlight.route.js";
import userContact from "./routers/Usercontact.route.js";
import about from "./routers/about.route.js";
import contact from "./routers/contact.route.js";
import search from "./routers/search.route.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import { cookieOptions } from "./utils/cookieOption.js";
import user from "./routers/user.route.js";
// call connect to DB//
const App = express();
DataBaseConnection();
App.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
App.use(passport.initialize());
App.use(passport.session());

App.use(express.json());
App.use(cookieParser());
App.use(morgan("dev"));

// setup cors //

App.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

App.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Set-Cookie"
  );
  next();
});

//routes

App.use("/banner", banner);
App.use("/stories", story);
App.use("/highlight", highlight);
App.use("/admin", Admin);
App.use("/contact", userContact);
App.use("/about", about);
App.use("/web-contact-del", contact);
App.use("/search", search);
App.use("/destination", destination);
App.use("/auth", user);
App.use("/", (req, res, next) => {
  res.status(404).send("Oops ! page not found..");
});
App.use(ErrorMiddleware);
export default App;
