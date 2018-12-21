import mongoose from "mongoose";
import settings from "../config";
mongoose.Promise = global.Promise;

export const connect = () =>
  mongoose
    .connect(
      settings.mongoURI,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("connected to mongo");
    })
    .catch(err => {
      console.log("connection error" + err);
    });
