import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['credited','debited'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    desc: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Transaction', transactionSchema)