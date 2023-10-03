import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstname : {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    birthDate:{
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profileImage: {
        type: String,
    }

}, {timestamps: true});

export const User = model('User', UserSchema);