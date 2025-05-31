import { config } from "dotenv";
config({ path: ".env" });
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../module/user.Module.js";
import SendEmail from "../utils/SendEmail.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/v3/auth/google/callback`,
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
          isGoogle: true,
        });
        // 🔁 Async background email task
        (async () => {
          try {
            const profileLink = `${process.env.FRONTEND_URL}/profile`;
            const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?id=${user._id}`;

            await SendEmail({
              to: user.email,
              userName: user.fullName,
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
      }

      (async () => {
        try {
          const profileLink = `${process.env.FRONTEND_URL}/profile`;
          const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?id=${user._id}`;

          await SendEmail({
            to: user.email,
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
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
