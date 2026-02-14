import { checkSchema } from "express-validator";
import { Document } from "mongoose";

import Condition from "../../models/condition.js";
import { CustomValidationType } from "../../utils/Types.js";

export const create = () => { 
    const conditionTitleExists = (value: string): Promise<CustomValidationType> => {
        const query: {title: string} = { title: value };

        return Condition.findOne(query)
            .then((conditionDoc: Document | null) => {
                if (conditionDoc) {
                    const error: Error = new Error(`Condition title already exists!`);

                    throw error;
                }
            });
    }

    return checkSchema({
        title: {
            custom: {
                options: conditionTitleExists,
                bail: true,
            },
            notEmpty: {
                errorMessage: "Condition title cannot be empty",
            }
        },
        conditionType: {
            notEmpty: {
                errorMessage: "Condition type cannot be empty",
            },
            isBoolean: {
                errorMessage: "Condition type's value is incorrect",
            }
        },
    })
}

export const search = () => { 
    return checkSchema({
        conditionType: {
            custom: {
                options: conditionTitleExists,
                bail: true,
            },
            notEmpty: {
                errorMessage: "Condition type parameter is missing.",
            }
        },
    })
}