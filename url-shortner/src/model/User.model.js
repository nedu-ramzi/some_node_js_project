import { Schema, model, ObjectId } from "mongoose";

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
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Url:{
        ref: "Child",
        type: ObjectId
    },
}, { timestamps: true });
export const Users = model('User', UserSchema);