var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkSchema } from "express-validator";
import Item from "../../models/item.js";
import Category from "../../models/category.js";
import Condition from "../../models/condition.js";
import Duration from "../../models/duration.js";
const itemNameExists = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { title: value };
    try {
        const itemDoc = yield Item.findOne(query);
        if (itemDoc) {
            const error = new Error(`Item name already exists!`);
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
});
export const itemTitleExists = () => {
    return checkSchema({
        title: {
            in: 'params',
            custom: {
                options: itemNameExists,
                bail: true,
            }
        },
    });
};
export const create = () => {
    const categoryIsValid = (value) => {
        const query = { name: value };
        return Category.findOne(query)
            .then((categoryDoc) => {
            if (!categoryDoc) {
                const error = new Error(`The Category which you provided, does not exist!`);
                throw error;
            }
        });
    };
    const itemConditionIsValid = (value) => {
        const query = { title: value };
        return Condition.findOne(query)
            .then((conditionDoc) => {
            if (!conditionDoc) {
                const error = new Error(`The selected item condition, does not exist!`);
                throw error;
            }
        });
    };
    const itemAquisitionPeriodIsValid = (value) => {
        const query = { title: value };
        return Duration.findOne(query)
            .then((durationDoc) => {
            if (!durationDoc) {
                const error = new Error(`The selected item acquisition period, does not exist!`);
                throw error;
            }
        });
    };
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
    });
};
