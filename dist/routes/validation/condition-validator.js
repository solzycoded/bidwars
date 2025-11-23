import { checkSchema } from "express-validator";
import Condition from "../../models/condition.js";
export const create = () => {
    const conditionTitleExists = (value) => {
        const query = { title: value };
        return Condition.findOne(query)
            .then((conditionDoc) => {
            if (conditionDoc) {
                const error = new Error(`Condition title already exists!`);
                throw error;
            }
        });
    };
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
    });
};
