import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner_names: {
    type: [String],
    required: true,
  },
  owner_mobile: {
    type: String,
    required: true,
  },
  owner_email: {
    type: String,
  },
  image: {
    type: String,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Business", businessSchema);
