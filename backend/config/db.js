import mongoose from "mongoose";
import { config } from "dotenv";
config();
const DataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DatabaseConnect Successfully...");
  } catch (error) {
    console.log(error);
    console.log("fail to connect DB...");
    process.exit(1);
  }
};
export default DataBaseConnection;
