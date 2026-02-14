import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { Document } from "mongoose";

import { errorHandler } from "../utils/Errorhandler.js";
import { ControllerResponseType } from "../utils/Types.js";
import { inputValidation } from "../utils/Validation.js";
import Condition from "../models/condition.js";

const create = async (req: Request, res: Response, next: NextFunction): ControllerResponseType => {
    try {
        inputValidation(req); // validate user input

        const { title, conditionType }: { title: string, conditionType: boolean } = matchedData(req); // retrieve validated user input

        const newCondition: Document = await Condition.create({
            title: title,
            preCondition: conditionType,
        });

        if(newCondition?._id) {
            return res.status(201).json({ success: true, message: `${title} was successfully created!` });
        }

        res.status(500).json({ success: false, message: `${title} was not successfully created!` });

        return;
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

const index = async (req: Request, res: Response, next: NextFunction): ControllerResponseType => {
    try {
        inputValidation(req); // validate user input

        const { conditionType }: { title: string, conditionType: string } = matchedData(req); // retrieve validated user input

        const preCondition: boolean = conditionType==="pre";

        const conditions = await Condition.find({
            preCondition,
        });

        return res.status(200).json({ success: true, data: conditions });
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

export default {
    create,
    index,
}