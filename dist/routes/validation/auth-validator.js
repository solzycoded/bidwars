import { checkSchema } from "express-validator";
import User from "../../models/user.js";
const signup = () => {
    const emailExists = (value) => {
        return User.findOne({ email: value })
            .then((userDoc) => {
            if (userDoc) {
                const error = new Error('E-Mail address already exists!');
                return Promise.reject(error);
            }
        });
    };
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
    });
};
export default {
    signup,
};
