// RESP: ROUTES for the ItemController
import express from "express";
import itemController from "../controllers/ItemController.js";
import { create, itemTitleExists } from "./validation/item-validator.js";
import authenticateJWT from "../middlewares/authentication.js";
const itemRouter = express.Router();
// check for duplicate name
itemRouter.get(`/validate-title/:title`, authenticateJWT, itemTitleExists(), itemController.validateTitle); // check if the provided item name already exists
itemRouter.post(`/create/:username`, create(), authenticateJWT, itemController.create); // create the item
export default itemRouter;
