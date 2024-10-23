import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  medium: {
    type: String,
    required: true,
    enum: ["Hindi", "English", "Gujarati", "Marathi", "Other"],
  },
  studyAt: {
    type: String,
  },
  curr_class: {
    type: Number,
  },
  study_level: {
    type: String,
    enum: ["College", "School", "Higher"],
    required: true,
  },
  college_year: {
    type: Number,
  },
  gotra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gotra",
    required: true,
  },
  study_place: {
    type: String,
    required: true,
  },
  study_type: {
    type: String,
    enum: ["Coaching", "Self Study"],
  },
  profile_pic: {
    type: String,
    // required: true
  },
  village: String,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
