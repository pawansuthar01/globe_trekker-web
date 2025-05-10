import { config } from "dotenv";
config({ path: ".env" });
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../module/user.Module.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          fullName: profile.displayName,
          email,
          avatar: {
            secure_url: profile.photos[0].value,
          },
          password: "",
        });
      }

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
