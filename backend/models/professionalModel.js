import mongoose from 'mongoose';


const professionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gotra_id: {
        type: String,
        required: true
    }
});

export default mongoose.model('Professional', professionalSchema);
