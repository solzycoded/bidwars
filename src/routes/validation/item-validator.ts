import { checkSchema } from "express-validator";
import { Document } from "mongoose";

import Item from "../../models/item.js";
import Category from "../../models/category.js";

import { CustomValidationType } from "../../utils/Types.js";

export const create = () => {
    const itemNameExists = (value: string): Promise<CustomValidationType> => {
        const query: {title: string} = { title: value };

        return Item.findOne(query)
            .then((itemDoc: Document | null) => {
                if (itemDoc) {
                    const error: Error = new Error(`Item name already exists!`);

                    throw error;
                }
            });
    }

    const categoryIsValid = (value: string): Promise<CustomValidationType> => {
        const query: {name: string} = { name: value };

        return Category.findOne(query)
            .then((categoryDoc: Document | null) => {
                if (!categoryDoc) {
                    const error: Error = new Error(`The Category which you provided, does not exist!`);

                    throw error;
                }
            });
    }

    return checkSchema({
        title: {
            notEmpty: {
                errorMessage: "Item must have a name!",
            },
            isLength: {
                options: {
                    min: 3,
                    max: 30,
                },
                errorMessage: "Item name's length cannot be less than 3 or more than 30"
            },
            custom: {
                options: itemNameExists,
                bail: true,
            }
        },
        price: {
            notEmpty: {
                errorMessage: "Item must have a price!",
            },
            isCurrency: {
                errorMessage: "Price isn't valid! It must be a number."
            }
        },
        salePeriod: {
            notEmpty: {
                errorMessage: "Item's sale period cannot be empty."
            },
            isInt: {
                errorMessage: "Sale Period isn't valid! It must be a number."
            }
        },
        category: {
            notEmpty: {
                errorMessage: "Category cannot be empty."
            },
            custom: {
                options: categoryIsValid,
                bail: true,
            }
        },
        previousCondition: {
            notEmpty: {
                errorMessage: "Item's previous condition cannot be empty."
            },
            // custom: {
            //     options: itemConditionIsValid,
            //     bail: true,
            // }
        },
        currentCondition: {
            notEmpty: {
                errorMessage: "Item's current condition cannot be empty."
            },
            // custom: {
            //     options: itemConditionIsValid,
            //     bail: true,
            // }
        },
        purchaseDuration: {
            notEmpty: {
                errorMessage: "Item's purchase duration cannot be empty."
            },
            isInt: {
                errorMessage: "Purchase Duration isn't valid! It must be a number."
            }
        },
        acquisitionPeriod: {
            notEmpty: {
                errorMessage: "Item's Acquisition Period cannot be empty (e.g. day(s), week(s), etc.)."
            },
            // custom: {
            //     options: itemAquisitionPeriodIsValid,
            //     bail: true,
            // }
        },
    })
}