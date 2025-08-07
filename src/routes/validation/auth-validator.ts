import { checkSchema } from "express-validator";

const signup = () => {
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
            notEmpty: {
                errorMessage: "Email cannot be empty",
            },
            isEmail: {
                bail: true,
                errorMessage: "Email is invalid. Please provide a valid email address"
            }
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