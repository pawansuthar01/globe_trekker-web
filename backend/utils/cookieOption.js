export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in production, false in dev
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // iOS + cross-site compatible
  maxAge: process.env.EXPIRES_IN,
};
