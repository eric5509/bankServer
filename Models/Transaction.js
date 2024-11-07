import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true 
    },
    accountNumber: {
        type: String,
        required: true 
    },
    transactionType:{
        type: String,
        enum: ['debit', 'credit'],
        required: [true, 'Please whats the type of the Transaction you are tying to perform?']
    },
    description: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'successful'],
        default: 'pending'
    },
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
}, { timestamps: true });  

export const Transaction = mongoose.model('Transaction', TransactionSchema);