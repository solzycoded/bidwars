var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { matchedData } from "express-validator";
import { errorHandler } from "../utils/Errorhandler.js";
import { inputValidation } from "../utils/Validation.js";
import Condition from "../models/condition.js";
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        inputValidation(req); // validate user input
        const { title, conditionType } = matchedData(req); // retrieve validated user input
        const newCondition = yield Condition.create({
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
});
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        inputValidation(req); // validate user input
        const { conditionType } = matchedData(req); // retrieve validated user input
        const preCondition = conditionType === "pre";
        const conditions = yield Condition.find({
            preCondition,
        });
        return res.status(200).json({ success: true, data: conditions });
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
});
export default {
    create,
    index,
};
