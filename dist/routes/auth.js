import router from "./expressRouter.js";
router.get("/login", (req, res) => {
    // console.log("something");
    res.status(200).json({
        message: "success"
    });
});
export default router;
