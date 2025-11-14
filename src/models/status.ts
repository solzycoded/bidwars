import { Schema, model } from "mongoose";

const statusSchema: Schema = new Schema({
    title: { // e.g. verified, pending review, under review, paused, live, stopped, past, etc.
        type: String,
        unique: true,
        required: true,
    },
});

const Status = model('Status', statusSchema);

export default Status;