class CustomError extends Error {
    statusCode?: number;
    data?: any;

    constructor(message: string, statusCode?: number, data?: any) {
        super(message); // Call the parent class constructor
        this.statusCode = statusCode;
        this.data = data;

        // Set the prototype explicitly (required for extending built-in classes in TypeScript)
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;