import { config } from "dotenv";
import App from "./app.js";
config();
const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
