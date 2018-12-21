import mongoose from "mongoose";
import { Categories } from "../utils/types";
const { Schema } = mongoose;

const settingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  categories: [
    {
      type: String,
      enum: Object.values(Categories),
      required: [true, "settings must have categories"]
    }
  ]
});
export default mongoose.model("Setting", settingSchema);
