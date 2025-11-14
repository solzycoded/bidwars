import { Schema, model } from "mongoose";

const durationSchema: Schema = new Schema({
    title: { // e.g. days, weeks, etc.
        type: String,
        unique: true,
        required: true,
    },
});

const Duration = model('Duration', durationSchema);

export default Duration;