import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
export const User = model('User', UserSchema);