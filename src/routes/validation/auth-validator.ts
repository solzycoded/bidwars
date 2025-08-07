import { checkSchema } from "express-validator";

import User from "../../models/user.js";
import { Document } from "mongoose";

const signup = () => {
    const emailExists = (value: string): Promise<PromiseRejectedResult | undefined> => {
        return User.findOne({ email: value })
            .then((userDoc: Document | null) => {
                if (userDoc) {
                    const error: Error = new Error('E-Mail address already exists!');

                    return Promise.reject(error);
                }
            });
    }

    // CREATE THE LOGIC TO CHECK USERNAME DUPLICATION, HERE

    return checkSchema({
        username: {
            notEmpty: {
                errorMessage: "Username cannot be empty",
            },
            isLength: {
                options: {
                    min: 3,
                    max: 20,
                },
                errorMessage: "Username length cannot be less than 3 or more than 20"
            }
        },
        email: {
            custom: {
                options: emailExists,
                bail: true,
            },
            notEmpty: {
                errorMessage: "Email cannot be empty",
            },
            isEmail: {
                bail: true,
                errorMessage: "Email is invalid. Please provide a valid email address"
            },
        },
        password: {
            notEmpty: {
                errorMessage: "Password cannot be empty",
            },
            isLength: { 
                options: { 
                    min: 8 
                },
                errorMessage: "Password length cannot be less than 8",
            }
        }
    })
}

export default {
    signup,
}