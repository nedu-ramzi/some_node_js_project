import { Schema, model } from "mongoose";

const registrationSchema = new Schema({
    id: {
        type: String,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    }

}, { timestamps: true });
export const Register = model('Register', registrationSchema);