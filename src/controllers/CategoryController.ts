import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

import { inputValidation } from "../utils/Validation.js";
import { errorHandler } from "../utils/Errorhandler.js";

import { matchedData } from "express-validator";
import Category from "../models/category.js";

import { ControllerResponseType } from "../utils/Types.js";


type CategoryInput = {
    name: string
}

const create = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponseType> => {
    try{
        inputValidation(req);

        const { name }: CategoryInput = matchedData(req); // retrieve the input from the validated matched data

        // create new Category
        const newCategory: Document = await Category.create({
            name: name
        });

        if(newCategory?._id) {
            return res.status(200).json({ success: true });
        }

        res.status(403).json({ success: false, data: { message: "Category was not created successfully! Try again later." } });

        return;
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

const index = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponseType> => { // get all of the existing categories
    try{
        const categories = await Category.find();

        res.status(200).json({ success: true, data: categories})
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

export default {
    create,
    index,
}