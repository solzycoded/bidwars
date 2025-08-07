import { validationResult, matchedData } from "express-validator";
import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
const signup = (req, res) => {
    const resultOfValidation = validationResult(req); // Get validation result
    if (!resultOfValidation.isEmpty()) {
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
        throw error;
    }
    const { username, email, password } = matchedData(req);
    console.log({ username, email, password });
};
export default {
    signup,
};
