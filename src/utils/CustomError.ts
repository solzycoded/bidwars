import { ValidationError } from "express-validator";

class CustomError extends Error {
    statusCode?: number;
    data?: ValidationError[];

    constructor(message: string, statusCode?: number, data?: ValidationError[]) {
        super(message); // Call the parent class constructor
        this.statusCode = statusCode;
        this.data = data;

        // Set the prototype explicitly (required for extending built-in classes in TypeScript)
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;