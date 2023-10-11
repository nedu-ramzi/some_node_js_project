import { Schema, model } from "mongoose";

const passwordResetSchema = new Schema({
    email: {
        type: 'string',
        unique: true,
        required: true
    },

    resetToken: {
        type: 'string',
    }


}, { timestamps: true, expires: 30 });

export const PasswordReset = model('PasswordReset', passwordResetSchema);