import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  ],
},{timestamps:true});

export const User = model("User",UserSchema)
