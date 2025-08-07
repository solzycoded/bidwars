import router from "./expressRouter.js";

router.post("/login", (req, res) => {
    // console.log("something");
    res.status(200).json({
        message: "success"
    });
});

router.oost("/signup", (req, res) => {
    // console.log("something");
    res.status(200).json({
        message: "success"
    });
});

export default router;