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
import * as bcrypt from "bcrypt";
import CustomError from "../utils/CustomError.js"; // Adjust the path as needed
import User from "../models/user.js";
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultOfValidation = validationResult(req); // Get validation result
        if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error
            const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
            throw error;
        }
        const { usernameOrEmail, password } = matchedData(req);
        const user = yield User.findOne({
            $or: [
                { "name": usernameOrEmail },
                { "email": usernameOrEmail },
            ]
        });
        const invalidCredentialsResponse = () => {
            return res.status(403).json({ success: false, data: { message: "Invalid Login Credentials." } });
        };
        if (!user) {
            return invalidCredentialsResponse();
        }
        const userPassword = user.password;
        const isValid = yield bcrypt.compare(password, userPassword);
        console.log(isValid);
        if (isValid) {
            return res.status(200).json({ success: true, data: { username: user.name, role: user.role } });
        }
        return invalidCredentialsResponse();
        // bcrypt.compare(password, userPassword, (err: Error | undefined) => {
        //     if (err) {
        //         return invalidCredentialsResponse();
        //     }
        //     res.status(200).json({ success: true, data: { username: user.name, role: user.role }});
        // });
    }
    catch (error) { // Use 'unknown' for the error type
        if (error instanceof CustomError) {
            // Handle CustomError
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
        else if (error instanceof Error) {
            console.log(error);
            // Handle generic Error
            next(new CustomError(error.message, 500, []));
        }
        else {
            // Handle unknown errors
            next(new CustomError("An unknown error occurred", 500, []));
        }
    }
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultOfValidation = validationResult(req); // Get validation result
        if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error 
            const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
            throw error;
        }
        const { username, email, password } = matchedData(req);
        // encrypt user's password and create a new user
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield User.create({
            name: username,
            email,
            password: hashedPassword,
        }); // create new user model object
        if (newUser._id !== undefined) { // IF user creation was successful, return success response
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
    }
    catch (error) { // Use 'unknown' for the error type
        if (error instanceof CustomError) {
            // Handle CustomError
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
        else if (error instanceof Error) {
            // Handle generic Error
            next(new CustomError(error.message, 500, []));
        }
        else {
            // Handle unknown errors
            next(new CustomError("An unknown error occurred", 500, []));
        }
    }
});
export default {
    signup,
    login,
};
