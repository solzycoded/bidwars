import { checkSchema } from "express-validator";

import Item from "../../models/item.js";
import Category from "../../models/category.js";
import { Document } from "mongoose";

import { CustomValidationType } from "../../utils/Types.js";

export const create = () => {
    const itemNameExists = (value: string): Promise<CustomValidationType> => {
        const query: {title: string} = { title: value };

        return Item.findOne(query)
            .then((categoryDoc: Document | null) => {
                if (categoryDoc) {
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

    //         condition: { 
    //             value: {
    //                 time: {
    //                     purchaseDuration: "",
    //                     acquisitionPeriod: "",
    //                 },
    //                 pre: "",
    //                 post: "",
    //             }, 
    //             active: false
    //         },

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
            // custom: {
            //     options: itemNameExists,
            //     bail: true,
            // }
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
            isInt: {
                errorMessage: "Sale Period isn't valid! It must be a number."
            }
        },
        // category: {
        //     notEmpty: {
        //         errorMessage: "Category cannot be empty."
        //     },
        //     custom: {
        //         options: categoryIsValid,
        //         bail: true,
        //     }
        // }
    })
}


// export const login = () => {
//     const userExists = (value: string): Promise<PromiseRejectedResult | undefined> => {
//         return User.findOne({
//             $or: [
//                 { name: value },
//                 { email: value }
//             ]
//         })
//             .then((userDoc: Document | null) => {
//                 if (!userDoc) {
//                     const error: Error = new Error(`Invalid Login Credentials`);

//                     return Promise.reject(error);
//                 }
//             });
//     }
// }