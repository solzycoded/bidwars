// RESP: holds user authentication logic
import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import * as bcrypt from "bcrypt";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";

import { SignupInputType, LoginInputType, UserType, ControllerResponseType } from "../utils/Types.js";
import User from "../models/user.js";
import { inputValidation } from "../utils/Validation.js";
import { errorHandler } from "../utils/Errorhandler.js";


/* _____________________________________________________________________________ PUBLIC FUNCTIONS */
const login = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponseType> => {
    try{
        inputValidation(req);

        const { usernameOrEmail, password }: LoginInputType = matchedData(req);

        const user: UserType | null = await User.findOne({
            $or: [
                { "name": usernameOrEmail },
                { "email": usernameOrEmail },
            ]
        });

        const invalidCredentialsResponse = (): Response => { // return a failed response
            return res.status(403).json({ success: false, data: { message: "Invalid Login Credentials." } });
        }

        if(!user) {
            return invalidCredentialsResponse();
        }

        const userPassword: string = user.password;

        const isValid = await bcrypt.compare(password, userPassword);

        if(isValid){
            const JWT_SECRET: string = process.env.JWT_SECRET || "ajwtsecret";

            const token = jwt.sign(
                {
                    username: user.name,
                    role: user.role,
                    id: user._id
                }, 
                JWT_SECRET, 
                { expiresIn: "15m" }
            ); // create web token

            if(!token) {
                return res.status(500).json({
                        success: false, 
                        data: { 
                            message: "Unable to complete Login.",
                        }
                    });
            }

            return res.status(200).json({ success: true, data: { username: user.name, role: user.role, token }});
        }

        return invalidCredentialsResponse();
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

const signup = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponseType> => {
    try {
        inputValidation(req);

        const { username, email, password }: SignupInputType = matchedData(req);

        // encrypt user's password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: Document = await User.create({
            name: username,
            email,
            password: hashedPassword,
        }); // create new user model object

        if(newUser._id!==undefined){ // IF user creation was successful, return success response
            return res.status(201)
                .json({ 
                    success: true, 
                    data: {
                        username,
                        message: "User was successfully created!"
                    }
                });
        }

        res.status(500).json({ 
            success: false,
            data: { 
                message: "User was not successfully created",
            },
        });
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
};

export default {
    signup,
    login,
};