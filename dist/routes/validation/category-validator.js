import { checkSchema } from "express-validator";
import Category from "../../models/category.js";
export const create = () => {
    const nameExists = (value) => {
        const query = { name: value };
        return Category.findOne(query)
            .then((categoryDoc) => {
            if (categoryDoc) {
                const error = new Error(`Category name already exists!`);
                throw error;
            }
        });
    };
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
    });
};
