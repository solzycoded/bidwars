class CustomError extends Error {
    constructor(message, statusCode, data) {
        super(message); // Call the parent class constructor
        this.statusCode = statusCode;
        this.data = data;
        // Set the prototype explicitly (required for extending built-in classes in TypeScript)
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
export default CustomError;
