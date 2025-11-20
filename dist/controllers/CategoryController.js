var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { inputValidation } from "../utils/Validation.js";
import { errorHandler } from "../utils/Errorhandler.js";
import { matchedData } from "express-validator";
import Category from "../models/category.js";
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        inputValidation(req);
        const { name } = matchedData(req); // retrieve the input from the validated matched data
        // create new Category
        const newCategory = yield Category.create({
            name: name
        });
        if (newCategory === null || newCategory === void 0 ? void 0 : newCategory._id) {
            return res.status(200).json({ success: true });
        }
        res.status(403).json({ success: false, data: { message: "Category was not created successfully! Try again later." } });
        return;
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
});
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.find();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
});
export default {
    create,
    index,
};
