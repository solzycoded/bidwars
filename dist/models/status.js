import { Schema, model } from "mongoose";
const statusSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
});
const Status = model('Status', statusSchema);
export default Status;
