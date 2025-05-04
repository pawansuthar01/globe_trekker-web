import { config } from "dotenv";
import cloudinaryPKG from "cloudinary";
const { v2: cloudinary } = cloudinaryPKG;
import App from "./app.js";
config();
const PORT = process.env.PORT || 3000;
export default cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
App.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
