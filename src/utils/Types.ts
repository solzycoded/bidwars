import { ObjectId } from "mongoose";
import { Response } from "express";

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

export type CustomValidationType = PromiseRejectedResult | void | Error | undefined;

export type ControllerResponseType = void | Response;

export type AuthorizedUserType = {
    username: string
    role: string
    id: ObjectId
}