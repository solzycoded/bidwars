import { ObjectId } from "mongoose";

/* Error */
export type ValidationData = {
    type: string
    value: string
    msg: string
    path: string
    location: string
} // purpose: the error fields in the array function of validationResult, after input validation

/* User */
export type SignupInputType = {
    email: string
    username: string
    password: string
}; // purpose: signup input fields

export type LoginInputType = {
    usernameOrEmail: string
    password: string
}

export type UserType = {
    _id: ObjectId
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
    __v: number
}