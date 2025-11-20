import { validationResult } from "express-validator";
import CustomError from "./CustomError.js"; // Adjust the path as needed
export const inputValidation = (req) => {
    const resultOfValidation = validationResult(req); // Get validation result
    if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
        throw error;
    }
};
