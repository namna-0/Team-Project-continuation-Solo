import mongoose from "mongoose";
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    default: "09:00",
  },
  endTime: {
    type: String,
    default: "18:00",
  },
  lunchTimeStart: {
    type: String,
    default: "12:00",
  },
  lunchTimeEnd: {
    type: String,
    default: "13:00",
  },
});

export const Employee = model("Employee", employeeSchema);
