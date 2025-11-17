// RESP: ROUTES for the AuthController
import authController from "../controllers/AuthController.js";
import authRouter from "./expressRouter.js";
import { login, signup } from "./validation/auth-validator.js";
authRouter.post("/login", login(), authController.login); // login
authRouter.post("/signup", signup(), authController.signup); // signup
export default authRouter;
