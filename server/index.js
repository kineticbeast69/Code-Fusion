import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./route/routes.js";
import codeRouter from "./route/codeRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("server is started at 8000");
    });
    console.log("database connected sucessfully");
  })
  .catch((err) => console.log(err));

// user login and signup routes
app.use("/auth", router);

// project details route are over here
app.use("/code", codeRouter);
