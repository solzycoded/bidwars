export type ValidationData = {
    type: string
    value: string
    msg: string
    path: string
    location: string
} // purpose: the error fields in the array function of validationResult, after input validation

export type UserType = {
    email: string;
    username: string;
    password: string;
}; // purpose: signup input fields