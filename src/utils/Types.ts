import { ObjectId } from "mongoose";

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