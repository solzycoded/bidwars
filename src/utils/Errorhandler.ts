import CustomError from "./CustomError.js"; // Adjust the path as needed
import { NextFunction } from "express";

export const errorHandler = (error: unknown, next: NextFunction) => {
    if (error instanceof CustomError) {
        // Handle CustomError
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    } else if (error instanceof Error) {
        // Handle generic Error
        next(new CustomError(error.message, 500, []));
    } else {
        // Handle unknown errors
        next(new CustomError("An unknown error occurred", 500, []));
    } 
}