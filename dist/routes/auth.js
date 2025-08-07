// RESP: ROUTES for the AuthController
import authController from "../controllers/AuthController.js";
import router from "./expressRouter.js";
import authValidator from "./validation/auth-validator.js";
router.post("/login", (req, res) => {
    res.status(200).json({
        message: "success"
    });
}); // login
router.post("/signup", authValidator.signup, authController.signup); // signup
export default router;
