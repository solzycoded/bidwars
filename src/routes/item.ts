// RESP: ROUTES for the ItemController
import { NextFunction, Request, Response } from "express";

import itemRouter from "./expressRouter.js";
import { create } from "./validation/item-validator.js";

itemRouter.post(`/create/:username`, create(), (req: Request, res: Response, next: NextFunction): void => {console.log("here!")});

export default itemRouter;