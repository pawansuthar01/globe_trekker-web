import express from "express";
import { DataBaseConnection } from "./config/DB.js";
const App = express();
App.use(express.json());
DataBaseConnection();
App.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "server start",
  });
});

export default App;
