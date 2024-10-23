import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
    contributors: {
        type: [String],
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
});

export default mongoose.model('Contribution', contributionSchema);