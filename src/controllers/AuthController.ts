// RESP: holds user authentication logic
import { Request, Response } from "express";
import { validationResult, Result, ValidationError, matchedData } from "express-validator";
import bcrypt from "bcrypt";

import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
import { UserInputType, UserModelType } from "../utils/Types.js";
import User from "../models/user.js";
import { Document } from "mongoose";

const signup = (req: Request, res: Response): void | Response => {
    const resultOfValidation: Result<ValidationError> = validationResult(req); // Get validation result

    if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());

        throw error;
    }

    const { username, email, password }: UserInputType = matchedData(req);

    // encrypt user's password and create a new user
    bcrypt.hash(password, 10, async (err: Error | undefined, hash: string): Promise<void | Response> => {
        if (err) {
            const error = new CustomError("Invalid password.", 500, []);

            throw error;
        }

        const user = new User({
            name: username,
            email,
            password: hash,
        }); // create new user model object

        const newUser: Document = await user.save(); // save user to db

        if(newUser._id!==undefined){ // IF user creation was successful, return success response
            return res.status(201)
                .json({ 
                    success: true, 
                    data: {
                        username
                    } 
                });
        }

        res.status(500).json({ 
            success: false,
            data: { 
                message: "User was not successfully created" 
            } 
        });
    });
};

export default {
    signup,
};