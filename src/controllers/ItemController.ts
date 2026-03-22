import { NextFunction, Request, Response } from "express";

import { errorHandler } from "../utils/Errorhandler.js";

import { matchedData } from "express-validator";
import Item from "../models/item.js";

import { ControllerResponseType } from "../utils/Types.js";


type TitleInput = {
    title: string
}

const validateTitle = (req: Request, res: Response, next: NextFunction): ControllerResponseType => {
    try{
        res.status(200).json({ 
            success: true, 
            data: { message: "The chosen item title doesn't exist, you can proceed!" },
        });

        return;
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

export default {
    validateTitle,
}