import mongoose from "mongoose";
import { Categories } from "../utils/types";
const { Schema } = mongoose;

const articleSchema = new Schema({
  category: {
    type: String,
    enum: Object.values(Categories),
    index: true
  },
  source: {
    type: String,
    required: [true, "article must have source"]
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: [true, "article must have url"]
  },
  urltoimage: {
    type: String,
    required: [true, "article must have url image"]
  },
  publishedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  content: {
    type: String,
    required: [true, "article must have content"]
  }
});
export default mongoose.model("Article", articleSchema);
