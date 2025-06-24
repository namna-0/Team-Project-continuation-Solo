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
    type: {
      halfTime: {
        type: String,
        default: "30",
      },
      fulltime: {
        type: String,
        default: "60",
      },
      none: {
        type: String,
        default: "",
      },
    },
  },
  startTime: {
    type: String,
    required: true,
    default: "09:00",
  },
  endTime: {
    type: String,
    required: true,
    default: "18:00",
  },
  lunchTimeStart: {
    type: String,
    required: true,
    default: "12:00",
  },
  lunchTimeEnd: {
    type: String,
    required: true,
    default: "13:00",
  },
});

export const Employee = model("Employee", employeeSchema);
