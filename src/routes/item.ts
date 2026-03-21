// RESP: ROUTES for the ItemController
import express, { NextFunction, Request, Response } from "express";

import itemController from "../controllers/ItemController.js";

import { create } from "./validation/item-validator.js";
import authenticateJWT from "../middlewares/authentication.js";

const itemRouter = express.Router();

// check for duplicate name
itemRouter.get(`/validate-title/:title`, authenticateJWT, itemController.validateTitle); // check if the provided item name already exists

itemRouter.post(`/create/:username`, create(), (req: Request, res: Response, next: NextFunction): void => {console.log("here!")}); // create the item

export default itemRouter;