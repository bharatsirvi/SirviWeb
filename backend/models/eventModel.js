import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

export default mongoose.model('Event', eventSchema);