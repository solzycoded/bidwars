var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { matchedData } from "express-validator";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { inputValidation } from "../utils/Validation.js";
import { errorHandler } from "../utils/Errorhandler.js";
/* _____________________________________________________________________________ PUBLIC FUNCTIONS */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        inputValidation(req);
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
        if (isValid) {
            const JWT_SECRET = process.env.JWT_SECRET || "ajwtsecret";
            const token = jwt.sign({
                username: user.name,
                role: user.role,
                id: user._id
            }, JWT_SECRET, { expiresIn: "15m" }); // create web token
            if (!token) {
                return res.status(500).json({
                    success: false,
                    data: {
                        message: "Unable to complete Login.",
                    }
                });
            }
            return res.status(200).json({ success: true, data: { username: user.name, role: user.role, token } });
        }
        return invalidCredentialsResponse();
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        inputValidation(req);
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
        errorHandler(error, next);
    }
});
export default {
    signup,
    login,
};
