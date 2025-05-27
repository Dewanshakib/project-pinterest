import mongoose, { model, Schema } from "mongoose";

const PinSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    id: String,
    url: String,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
},{timestamps:true});

export const Pin = model("Pin", PinSchema);
