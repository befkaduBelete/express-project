import mongoose, { Schema } from "mongoose";

const UserSchemas = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchemas);
