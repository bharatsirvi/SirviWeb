import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  father_name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,

    enum: ["male", "female"],
  },
  mobile: {
    type: String,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"],
    required: true,
  },
  email: {
    type: String,
  },
  profile_pic: {
    type: Buffer,
  },
  vilage: String,
  gotra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gotra",
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password should have minimum 8 characters"],
  },
});

export default mongoose.model("User", UserSchema);
