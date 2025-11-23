// RESP: ROUTES for the ItemController
import express, { NextFunction, Request, Response } from "express";

import { create } from "./validation/item-validator.js";

const itemRouter = express.Router();

itemRouter.post(`/create/:username`, create(), (req: Request, res: Response, next: NextFunction): void => {console.log("here!")});

export default itemRouter;