// RESP: ROUTES for the AuthController
import express from "express";

import authController from "../controllers/AuthController.js";
import { login, signup } from "./validation/auth-validator.js";

const authRouter = express.Router();

authRouter.post("/login", login(), authController.login); // login

authRouter.post("/signup", signup(), authController.signup); // signup

export default authRouter;