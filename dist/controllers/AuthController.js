var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
import User from "../models/user.js";
const signup = (req, res) => {
    const resultOfValidation = validationResult(req); // Get validation result
    if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error
        const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
        throw error;
    }
    const { username, email, password } = matchedData(req);
    // encrypt user's password and create a new user
    bcrypt.hash(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            const error = new CustomError("Invalid password.", 500, []);
            throw error;
        }
        const user = new User({
            name: username,
            email,
            password: hash,
        }); // create new user model object
        const newUser = yield user.save(); // save user to db
        if (newUser._id !== undefined) { // IF user creation was successful, return success response
            return res.status(201)
                .json({
                success: true,
                data: {
                    username,
                    id: newUser._id
                }
            });
        }
        res.status(500).json({
            success: false,
            data: {
                message: "User was not successfully created"
            }
        });
    }));
};
export default {
    signup,
};
