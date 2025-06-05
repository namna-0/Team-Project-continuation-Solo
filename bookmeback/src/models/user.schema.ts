import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  owog: {
    type: String,
    required: true,
    default: "No Owog",
  },
  userName: {
    type: String,
    required: true,
    default: "No Name",
  },
  phone: {
    type: String,
    required: true,
    default: "No number added",
  },
  email: {
    type: String,
    required: true,
    default: "No email added",
  },
  password: {
    type: String,
    required: true,
    default: "duus2",
  },
  address: {
    type: String,
    required: true,
    default: "No address added",
  },
  role: {
    type: String,
    required: true,
    default: "Costumer",
  },
  savedProducts: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
export const userModel = model("User", userSchema);
