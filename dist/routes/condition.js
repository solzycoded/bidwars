// RESP: ROUTES for the ConditionController
import express from "express";
import conditionController from "../controllers/ConditionController.js";
import { create } from "./validation/condition-validator.js";
import { admin } from "../middlewares/authorization.js";
const conditionRouter = express.Router();
conditionRouter.post(`/create`, admin, create(), conditionController.create);
export default conditionRouter;
