import { checkSchema } from "express-validator";
import { Document } from "mongoose";

import Item from "../../models/item.js";
import Category from "../../models/category.js";
import Condition from "../../models/condition.js";
import Duration from "../../models/duration.js";

import { CustomValidationType } from "../../utils/Types.js";

const itemNameExists = async (value: string): Promise<CustomValidationType> => {
    const query: {title: string} = { title: value };

    try {
        const itemDoc = await Item.findOne(query);
        if (itemDoc) {
            const error: Error = new Error(`Item name already exists!`);

            throw error;
        }
    } catch (error) {
        throw error;
    }
}

export const itemTitleExists = () => { // a middleware to validate the title parameter
    return checkSchema({
        title: {
            in: 'params',
            custom: {
                options: itemNameExists,
                bail: true,
            }
        },
    });
}

export const create = () => {
    const categoryIsValid = async (value: string): Promise<CustomValidationType> => {
        const query: {name: string} = { name: value };

        try {
            const categoryDoc = await Category.findOne(query);
            if (!categoryDoc) {
                const error: Error = new Error(`The Category which you provided, does not exist!`);

                throw error;
            }
        } catch (error) {
            throw error;
        }
        // return Category.findOne(query)
        //     .then((categoryDoc: Document | null) => {
        //         if (!categoryDoc) {
        //             const error: Error = new Error(`The Category which you provided, does not exist!`);

        //             throw error;
        //         }
        //     });
    }

    const itemConditionIsValid = (value: string): Promise<CustomValidationType> => {
        const query: {title: string} = { title: value };

        return Condition.findOne(query)
            .then((conditionDoc: Document | null) => {
                if (!conditionDoc) {
                    const error: Error = new Error(`The selected item condition, does not exist!`);

                    throw error;
                }
            });
    }

    const itemAquisitionPeriodIsValid = (value: string): Promise<CustomValidationType> => {
        const query: {title: string} = { title: value };

        return Duration.findOne(query)
            .then((durationDoc: Document | null) => {
                if (!durationDoc) {
                    const error: Error = new Error(`The selected item acquisition period, does not exist!`);

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
            custom: {
                options: itemConditionIsValid,
                bail: true,
            }
        },
        currentCondition: {
            notEmpty: {
                errorMessage: "Item's current condition cannot be empty."
            },
            custom: {
                options: itemConditionIsValid,
                bail: true,
            }
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
            custom: {
                options: itemAquisitionPeriodIsValid,
                bail: true,
            }
        },
    })
}