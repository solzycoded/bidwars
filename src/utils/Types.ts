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
export type UserInputType = {
    email: string
    username: string
    password: string
}; // purpose: signup input fields

export type UserModelType = {
    email: string
    username: string
    password: string
    role: string
    _id?: ObjectId
    createdAt?: Date
    __v?: number
}; // purpose: signup input fields