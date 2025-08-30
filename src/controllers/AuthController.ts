// RESP: holds user authentication logic
import { NextFunction, Request, Response } from "express";
import { validationResult, Result, ValidationError, matchedData } from "express-validator";
import * as bcrypt from "bcrypt";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";

import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
import { SignupInputType, LoginInputType, UserType } from "../utils/Types.js";
import User from "../models/user.js";


/* _____________________________________________________________________________ PUBLIC FUNCTIONS */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
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
                { sub: user._id }, 
                JWT_SECRET, 
                { expiresIn: "15m" }
            ); // create web token

            return res.status(200).json({ success: true, data: { username: user.name, role: user.role, token }});
        }

        return invalidCredentialsResponse();
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
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

/* _____________________________________________________________________________ PRIVATE FUNCTIONS */

const errorHandler = (error: unknown, next: NextFunction) => {
    if (error instanceof CustomError) {
        // Handle CustomError
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    } else if (error instanceof Error) {
        // Handle generic Error
        next(new CustomError(error.message, 500, []));
    } else {
        // Handle unknown errors
        next(new CustomError("An unknown error occurred", 500, []));
    }
}

const inputValidation = (req: Request) => {
    const resultOfValidation: Result<ValidationError> = validationResult(req); // Get validation result

    if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());

        throw error;
    }
}

export default {
    signup,
    login,
};