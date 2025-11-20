import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

type User = {
    username: string
    role: string
    id: ObjectId
};

const authenticateJWT = (req: Request & { user?: User }, res: Response, next: NextFunction) => {
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

    try {
        // { username: string, id: ObjectId, role: string }
        // verify token
        const JWT_SECRET: string = process.env.JWT_SECRET || "ajwtsecret";

        const decoded = jwt.verify(token, JWT_SECRET) as User;

        // attach user to request
        req.user = decoded;

        next();
    } catch(error) {
        // console.log(error);
        return res.status(403).json({
            message: "Invalid or Expired token",
        });
    }
}

export default authenticateJWT;