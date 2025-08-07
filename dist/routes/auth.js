import authController from "../controllers/AuthController.js";
import router from "./expressRouter.js";
router.post("/login", (req, res) => {
    // console.log("something");
    res.status(200).json({
        message: "success"
    });
});
router.post("/signup", authController.signup);
export default router;
