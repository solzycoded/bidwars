import { Request, Response } from "express";
import { validationResult, Result, ValidationError } from "express-validator";
import CustomError from "../utils/CustomError"; // Adjust the path as needed

type UserType = {
    email: string;
    username: string;
    password: string;
};

const signup = (req: Request, res: Response): void | Response => {
    const resultOfValidation: Result<ValidationError> = validationResult(req); // Get validation result

    if (!resultOfValidation.isEmpty()) {
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
        throw error;
    }

    // Your signup logic here...
};

export default {
    signup,
};