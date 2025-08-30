import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "ajwtsecret";
const user: object = {};

const authenticateJWT = (req: Request & { user?: object }, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing!",
        });
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            message: "Token missing!",
        });
    }

    try {
        // verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };

        // attach user to request
        req.user = decoded;

        next();
    } catch {
        return res.status(403).json({
            message: "Invalid or Expired token",
        });
    }
}

export default authenticateJWT;