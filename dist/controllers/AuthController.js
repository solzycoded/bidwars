import { validationResult } from "express-validator";
import CustomError from "../utils/CustomError"; // Adjust the path as needed
const signup = (req, res) => {
    const resultOfValidation = validationResult(req); // Get validation result
    if (!resultOfValidation.isEmpty()) {
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
        throw error;
    }
    // Your signup logic here...
};
export default {
    signup,
};
