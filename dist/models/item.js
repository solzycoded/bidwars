import mongoose, { Schema, model } from "mongoose";
const itemSchema = new Schema({
    name: {
        type: String,
        unique: [true, "An item with this title already exists"],
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    sellingTime: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    dateSold: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    purchaseDuration: {
        type: {
            time: {
                type: Number,
                required: true
            },
            duration: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Duration",
            }
        },
        required: [true, 'You must tell us, how long ago you acquired this item'],
    },
    condition: {
        type: {
            previous: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Condition",
            },
            current: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Condition",
            }
        },
        required: [true, 'The current and previous condition of the item must be provided']
    },
    itemStatus: {
        type: [{
                status: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Status",
                },
                comment: {
                    type: String,
                    default: "N/A",
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }],
        required: [true, 'The current and previous condition of the item must be provided']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});
const Item = model('Item', itemSchema);
export default Item;
