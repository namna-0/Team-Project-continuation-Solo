import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  companyImages: {
    type: [String],
    default: [],
  },
  address: { type: String, required: true },
  city: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: [],
    },
  ],
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: [],
    },
  ],
  workingHours: {
    type: {
      monday: {
        open: String,
        close: String,
        closed: Boolean,
      },
      tuesday: {
        open: String,
        close: String,
        closed: Boolean,
      },
      wednesday: {
        open: String,
        close: String,
        closed: Boolean,
      },
      thursday: {
        open: String,
        close: String,
        closed: Boolean,
      },
      friday: {
        open: String,
        close: String,
        closed: Boolean,
      },
      saturday: {
        open: String,
        close: String,
        closed: Boolean,
      },
      sunday: {
        open: String,
        close: String,
        closed: Boolean,
      },
    },
    default: {},
  },
  lunchBreak: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Company = model("Company", companySchema);
