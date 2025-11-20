// RESP: ROUTES for the ItemController
import categoryController from "../controllers/CategoryController.js"

import categoryRouter from "./expressRouter.js";
import { create } from "./validation/category-validator.js";
import authenticateJWT from "../middlewares/authentication.js";

categoryRouter.post(`/create`, authenticateJWT, create(), categoryController.create);

categoryRouter.get(`/index`, categoryController.index);

export default categoryRouter;