export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production" ? true : false,
  sameSite: process.env.NODE_ENV == "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production" ? true : false,
  sameSite: process.env.NODE_ENV == "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
