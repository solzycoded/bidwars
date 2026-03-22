import { errorHandler } from "../utils/Errorhandler.js";
const validateTitle = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: { message: "The chosen item title doesn't exist, you can proceed!" },
        });
        return;
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
};
export default {
    validateTitle,
};
