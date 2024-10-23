import mongoose from 'mongoose';
const imageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    capture_date: {
        type: Date,
    },
    desc: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    contribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
    },
    upload_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    upload_date:{
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model('Image', imageSchema);
