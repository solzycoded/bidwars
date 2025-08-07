type ValidationData = {
    type: string
    value: string
    msg: string
    path: string
    location: string
}

class CustomError extends Error {
    statusCode?: number;
    data?: Partial<ValidationData>[];

    constructor(message: string, statusCode?: number, data?: Partial<ValidationData>[]) {
        super(message); // Call the parent class constructor
        this.statusCode = statusCode;
        this.data = data;

        // Set the prototype explicitly (required for extending built-in classes in TypeScript)
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;