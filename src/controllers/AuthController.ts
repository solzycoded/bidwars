import { Request, Response } from "express";
import { validationResult, Result, ValidationError, matchedData } from "express-validator";
import bcrypt from "bcrypt";

import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
import { UserType } from "../utils/Types.ts";

const signup = (req: Request, res: Response): void | Response => {
    const resultOfValidation: Result<ValidationError> = validationResult(req); // Get validation result

    if (!resultOfValidation.isEmpty()) {
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());

        throw error;
    }

    const { username, email, password }: UserType = matchedData(req);

    bcrypt.hash(password, 10, (err: object, hash: string): void | Response => {
        if (err) {
            const error = new CustomError("Invalid password.", 500, []);

            throw error;
        }

        
        // user.create(data, (err, result) => {
        //     try{
        //         if(result.insertId==undefined){
        //             res.status(201).json({ success: false, data: { message: "Username or Email already exists" } });
        //         }
        //         else{
        //             res.status(201).json({ success: true, data: { token: token, username, role: role, id: result.insertId } });
        //         }
        //     } catch(err) {
        //         return res.status(201).json({ success: false, data: { message: "Username or Email already exists", error: err} });
        //     }
        // });
    });
};

export default {
    signup,
};