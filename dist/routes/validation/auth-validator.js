import { checkSchema } from "express-validator";
import User from "../../models/user.js";
const signup = () => {
    const emailExists = (value) => {
        return fieldExists("email", value, 'E-Mail address');
    };
    const usernameExists = (value) => {
        return fieldExists("name", value, 'Username');
    };
    const fieldExists = (field, value, errorMsg) => {
        const query = field === "email" ? { email: value } : { name: value };
        return User.findOne(query)
            .then((userDoc) => {
            if (userDoc) {
                const error = new Error(`${errorMsg} already exists!`);
                return Promise.reject(error);
            }
        });
    };
    // CREATE THE LOGIC TO CHECK USERNAME DUPLICATION, HERE
    return checkSchema({
        username: {
            custom: {
                options: usernameExists,
                bail: true,
            },
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
