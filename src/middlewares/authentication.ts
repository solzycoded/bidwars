import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthorizedUserType, ControllerResponseType } from "../utils/Types.js";

export const authenticateUser = (req: Request & { user?: AuthorizedUserType }, res: Response, next: NextFunction): ControllerResponseType => {
    const authHeader = req.headers?.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "You're not authorized to perform this action!",
        });
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            message: "You're not authorized to perform this action!",
        });
    }

    // { username: string, id: ObjectId, role: string }
    // verify token
    const JWT_SECRET: string = process.env.JWT_SECRET || "ajwtsecret";

    const decoded = jwt.verify(token, JWT_SECRET) as AuthorizedUserType;

    // attach user to request
    req.user = decoded;
}

const authenticateJWT = (req: Request & { user?: AuthorizedUserType }, res: Response, next: NextFunction): ControllerResponseType => {
    try {
        authenticateUser(req, res, next); // authenticate the user

        next();
    } catch {
        return res.status(403).json({
            message: "Invalid or Expired token",
        });
    }
}

export default authenticateJWT;