export const cookieOptions = {
  httpOnly: true,
  secure: true, // must be true for SameSite=None to work
  sameSite: "None", // iOS needs SameSite=None
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
