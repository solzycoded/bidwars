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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.status(201).json({ success: false, data: { message: "Invalid Login Credentials." } });
    };
    if (!user) {
        return invalidCredentialsResponse();
    }
    const userPassword = user.password;
    bcrypt.compare(password, userPassword, (err) => {
        if (err) {
            return invalidCredentialsResponse();
        }
        res.status(200).json({ success: true, data: { username: user.name, role: user.role } });
    });
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("in signup");
        const resultOfValidation = validationResult(req); // Get validation result
        if (!resultOfValidation.isEmpty()) { // if user input isn't valild, throw an error 
            const error = new CustomError("Validation failed.", 422, resultOfValidation.array());
            throw error;
        }
        console.log("in signup 1.0");
        // const { username, email, password }: SignupInputType = matchedData(req);
        // // encrypt user's password and create a new user
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hashed psss");
        // const user = new User({
        //     name: username,
        //     email,
        //     password: hashedPassword,
        // }); // create new user model object
        // const newUser: Document = await user.save(); // save user to db
        // if(newUser._id!==undefined){ // IF user creation was successful, return success response
        //     return res.status(201)
        //         .json({ 
        //             success: true, 
        //             data: {
        //                 username
        //             } 
        //         });
        // }
        // res.status(500).json({ 
        //     success: false,
        //     data: { 
        //         message: "User was not successfully created" 
        //     } 
        // });
        // bcrypt.hash(password, 10, async (err: Error | undefined, hash: string): Promise<void | Response> => {
        //     if (err) {
        //         const error = new CustomError("Invalid password.", 500, []);
        //         throw error;
        //     }
        // });
    }
    catch (error) { // Use 'unknown' for the error type
        if (error instanceof CustomError) {
            // Handle CustomError
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            // console.log("passing this error: ", error.statusCode, " : ", error.data);
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
