export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true in production, false in dev
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // iOS + cross-site compatible
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
