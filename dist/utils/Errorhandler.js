import CustomError from "./CustomError.js"; // Adjust the path as needed
export const errorHandler = (error, next) => {
    if (error instanceof CustomError) {
        // Handle CustomError
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
    else if (error instanceof Error) {
        // Handle generic Error
        next(new CustomError(error.message, 500, []));
    }
    else {
        // Handle unknown errors
        next(new CustomError("An unknown error occurred", 500, []));
    }
};
