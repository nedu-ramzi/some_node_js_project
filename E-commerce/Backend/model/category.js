import mongoose, { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color:{
        type: String
    },
    icon: {
        type: String
    }
}, { timestamps: true });

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

export const Category = model('Category', categorySchema);