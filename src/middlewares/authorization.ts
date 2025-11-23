import { Request, Response, NextFunction } from "express";

import { authenticateUser } from "./authentication.js";
import { AuthorizedUserType, ControllerResponseType } from "../utils/Types.js";

export const admin = (req: Request & { user?: AuthorizedUserType }, res: Response, next: NextFunction): ControllerResponseType => {
    try {
        authenticateUser(req, res, next);

        if(req?.user?.role!=="admin"){
            // unset user key from the "req" object
            delete req.user;

            // return a 401 response, indicating invalid request
            return res.status(401).json({
                message: "You're not authorized to perform this action!",
            });
        }

        next();
    } catch {
        return res.status(403).json({
            message: "Unauthorized access!",
        });
    }
}