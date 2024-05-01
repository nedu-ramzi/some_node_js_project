import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
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
        type: "string",
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const User = model('User', userSchema);