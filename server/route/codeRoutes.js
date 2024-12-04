import express from "express";
import {
  createCode,
  readProject,
  deleteProject,
  singleProject,
  updateProject,
} from "../controller/codeController.js";
const codeRouter = express.Router();

codeRouter.post("/create", createCode);
codeRouter.get("/read/:userID", readProject);
codeRouter.get("/single/:id", singleProject);
codeRouter.put("/update", updateProject);
codeRouter.delete("/delete/:projectID", deleteProject);
export default codeRouter;
