import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please input an Email']
    },
    token: {
        type: String,
        required: [true, 'Please input a Token']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Please input a Date']
    },
}, {timestamps: true})

export const Token = mongoose.model('Token', TokenSchema)