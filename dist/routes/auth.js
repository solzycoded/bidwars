// RESP: ROUTES for the AuthController
import authController from "../controllers/AuthController.js";
import router from "./expressRouter.js";
import { login, signup } from "./validation/auth-validator.js";
router.post("/login", login(), authController.login); // login
router.post("/signup", signup(), authController.signup); // signup
export default router;
