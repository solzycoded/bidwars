// RESP: ROUTES for the ItemController
import { NextFunction, Request, Response } from "express";

import categoryRouter from "./expressRouter.js";
// import { create } from "./validation/category-validator.js";
import authenticateJWT from "../middlewares/authentication.js";

categoryRouter.post(`/create`, [authenticateJWT], (req: Request, res: Response, next: NextFunction): void => {
    console.log("here");
});

export default categoryRouter;