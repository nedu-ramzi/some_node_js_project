import mongoose, { Schema, model } from "mongoose";
const passwordResetSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    resetToken: {
        type: String,
        required: true

    },
    expiresIn: {
        type: Date,
        default: new Date(Date.now() + 30 * 60 * 1000)
    }

}, { timestamps: true })

export const PasswordReset = model("PasswordReset", passwordResetSchema);