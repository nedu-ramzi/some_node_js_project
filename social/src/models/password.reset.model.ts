import {Schema, model} from 'mongoose';

const PasswordResetSchema = new Schema({
    email: {
        type: String,
    },

    resetToken: {
        type: String,
    }
}, { timestamps: true, expires: 30 });

export const PasswordReset = model( 'PasswordReset', PasswordResetSchema );