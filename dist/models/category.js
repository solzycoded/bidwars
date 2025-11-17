import { Schema, model } from "mongoose";
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
});
const Category = model('Category', categorySchema);
export default Category;
