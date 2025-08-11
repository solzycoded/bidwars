// RESP: ROUTES for the AuthController
import authController from "../controllers/AuthController.js";
import router from "./expressRouter.js";
import authValidator from "./validation/auth-validator.js";

router.post("/login", authValidator.login(), authController.login); // login

router.post("/signup", authValidator.signup(), authController.signup); // signup

export default router;