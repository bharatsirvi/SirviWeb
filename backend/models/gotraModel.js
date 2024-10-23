import mongoose from "mongoose";

const gotraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kuldevi: {
    type: String,
    // required: true
  },
});

export default mongoose.model("Gotra", gotraSchema);
