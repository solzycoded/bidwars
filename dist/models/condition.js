import { Schema, model } from "mongoose";
const conditionSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    preCondition: {
        type: Boolean,
        default: false,
    },
});
const Condition = model('Condition', conditionSchema);
export default Condition;
