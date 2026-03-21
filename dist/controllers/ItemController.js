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
const validateTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) { // Use 'unknown' for the error type
        errorHandler(error, next);
    }
});
export default {
    validateTitle,
};
