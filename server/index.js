import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/userRoutes.js";

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/user", router);

mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "ECommerce" })
  .then(() => console.log("Database is Connected"))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on http://localhost:${PORT}`);
    });
  });
