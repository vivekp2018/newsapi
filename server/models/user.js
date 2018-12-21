import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "user must have source"]
  },
  password: {
    type: String,
    required: [true, "user must have password"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("User", userSchema);
