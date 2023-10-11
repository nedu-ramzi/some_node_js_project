import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: "string",
        required: true
    },

    email: {
        type: "string",
        required: true,
        unique: true
    },

    password: {
        type: "string",

    },
    profileImage: {
        type: 'string'
    }
}, { timestamps: true });

export const User = model('User', userSchema);