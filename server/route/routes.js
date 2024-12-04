import express from "express";
import { login, signup, validUser } from "../controller/userController.js";
const router = express.Router();

// user routes are over here
router.post("/signup", signup);
router.post("/login", login);
router.post("/valid", validUser);

// code routes are over here

export default router;
