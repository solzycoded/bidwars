import { Request, Response } from "express";
import { validationResult, Result, ValidationError, matchedData } from "express-validator";

import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
import { UserType } from "../utils/Types.ts";

const signup = (req: Request, res: Response): void | Response => {
    const resultOfValidation: Result<ValidationError> = validationResult(req); // Get validation result

    if (!resultOfValidation.isEmpty()) {
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());

        throw error;
    }

    const { username, email, password }: UserType = matchedData(req);


};

export default {
    signup,
};