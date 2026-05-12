import { NextFunction, Request, Response } from "express";

import { errorHandler } from "../utils/Errorhandler.js";

import { matchedData } from "express-validator";
import { inputValidation } from "../utils/Validation.js";
import Item from "../models/item.js";

import { ControllerResponseType } from "../utils/Types.js";

type TitleInput = {
    title: string
}

type ItemInput = {
    title: string
}

const validateTitle = (req: Request, res: Response, next: NextFunction): ControllerResponseType => {
    try{
        inputValidation(req); // Check for validation errors from the middleware

        res.status(200).json({ 
            success: true, 
            data: { message: "The chosen item title doesn't exist, you can proceed!" },
        });

        return;
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

const create = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponseType> => {
    try{
        inputValidation(req);
// , price, salePeriod, category, previousConditioon
        const { title }: ItemInput = matchedData(req); // retrieve the input from the validated matched data

        console.log(title);
        
        // create new Category
        // const newCategory: Document = await Category.create({
        //     name: name
        // });

        // if(newCategory?._id) {
            return res.status(200).json({ success: true });
        // }

        // res.status(403).json({ success: false, data: { message: "Category was not created successfully! Try again later." } });

        // return;
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

export default {
    validateTitle,
    create,
}