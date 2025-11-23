// RESP: ROUTES for the ItemController
import express from "express";

import categoryController from "../controllers/CategoryController.js";
import { create } from "./validation/category-validator.js";
import authenticateJWT from "../middlewares/authentication.js";

const categoryRouter = express.Router();

categoryRouter.post(`/create`, authenticateJWT, create(), categoryController.create);

categoryRouter.get(`/index`, categoryController.index);

export default categoryRouter;