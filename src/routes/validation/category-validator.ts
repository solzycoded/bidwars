import { checkSchema } from "express-validator";

import Category from "../../models/category.js";
import { Document } from "mongoose";

import { CustomValidationType } from "../../utils/Types.js";

export const create = () => { 
    const nameExists = (value: string): Promise<CustomValidationType> => {
        const query: {name: string} = { name: value };

        return Category.findOne(query)
            .then((categoryDoc: Document | null) => {
                if (categoryDoc) {
                    const error: Error = new Error(`Category name already exists!`);

                    throw error;
                }
            });
    }

    return checkSchema({
        name: {
            custom: {
                options: nameExists,
                bail: true,
            },
            notEmpty: {
                errorMessage: "Category name cannot be empty",
            }
        },
    })
}
