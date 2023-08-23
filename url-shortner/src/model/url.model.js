import { Schema, model, ObjectId } from "mongoose";
import { nanoid } from 'nanoid';


const urlSchema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: nanoid(8)
    },
    Users: {
        ref: "Child",
        type: ObjectId
    },
}, { timestamps: true });


export const shortUrl = model('shortUrl', urlSchema);