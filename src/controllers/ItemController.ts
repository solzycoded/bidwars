import { NextFunction, Request, Response } from "express";

import { errorHandler } from "../utils/Errorhandler.js";

import { matchedData } from "express-validator";
import Item from "../models/item.js";

import { ControllerResponseType } from "../utils/Types.js";


type TitleInput = {
    title: string
}

const validateTitle = async (req: Request, res: Response, next: NextFunction): Promise<ControllerResponseType> => {
    try{
        console.log(req);
        // const title: string = req.body.query; // retrieve the input from the validated matched data

        // const escapeRegExp = (str: string): string => { // this ensures that the search is case insensitive
        //     return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        // }

        // // find an item that matches title
        // const titleQuery = {
        //     title: new RegExp(`^${escapeRegExp(title)}$`, "i"),
        // }
        // const item = await Item.findOne(titleQuery);

        // const itemExists = item?.id!==null;

        // res.status(200).json({ 
        //     success: itemExists, 
        //     data: { message: (itemExists ? "Item name already exists!" : "") },
        // });

        return;
    } catch (error: unknown) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
}

export default {
    validateTitle,
}