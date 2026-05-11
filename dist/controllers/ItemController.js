var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { errorHandler } from "../utils/Errorhandler.js";
import { matchedData } from "express-validator";
import { inputValidation } from "../utils/Validation.js";
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
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        inputValidation(req);
        const { title } = matchedData(req); // retrieve the input from the validated matched data
        console.log(title);
        // create new Category
        // const newCategory: Document = await Category.create({
        //     name: name
        // });
        // if(newCategory?._id) {
        return res.status(200).json({ success: true });
        // }
        // res.status(403).json({ success: false, data: { message: "Category was not created successfully! Try again later." } });
        return;
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
});
export default {
    validateTitle,
    create,
};
