import { matchedData } from "express-validator";
import { errorHandler } from "../utils/Errorhandler.js";
import { inputValidation } from "../utils/Validation.js";
import Condition from "../models/condition.js";
const create = (req, res, next) => {
    try {
        inputValidation(req); // validate user input
        const { title, conditionType } = matchedData(req); // retrieve validated user input
        const newCondition = Condition.create({
            title: title,
            preCondition: conditionType,
        });
        if (newCondition === null || newCondition === void 0 ? void 0 : newCondition._id) {
            return res.status(201).json({ success: true, message: `${title} was successfully created!` });
        }
        res.status(500).json({ success: false, message: `${title} was not successfully created!` });
        return;
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
};
export default {
    create,
};
