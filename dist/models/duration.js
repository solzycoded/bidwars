import { Schema, model } from "mongoose";
const durationSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
});
const Duration = model('Duration', durationSchema);
export default Duration;
