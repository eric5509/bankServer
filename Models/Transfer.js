import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
     senderAccountName: {
        type: String,
        required: true 
    },
    senderAccountNumber: {
        type: String,
        required: true 
    },
    recipientAccountName: {
        type: String,
        required: true 
    },
    recipientBankName: {
        type: String,
        required: true 
    },
    recipientAccountNumber: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
    transferDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
   
}, { timestamps: true });  

export const Transfer = mongoose.model('Transfer', TransferSchema);
