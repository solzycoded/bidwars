import categoryRouter from "./expressRouter.js";
// import { create } from "./validation/category-validator.js";
import authenticateJWT from "../middlewares/authentication.js";
categoryRouter.post(`/create`, [authenticateJWT], (req, res, next) => { console.log("here!"); });
export default categoryRouter;
