import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema({
  email: { type: String, required: false },
  workingHours: { type: String, required: false},
  lunchBreak: { type: String, required: false, default: ""},
  password: { type: String, required: false, default: ""},
  companyName: { type: String, required: false, default: "" },
  address: { type: String, required: false, default: "" },
  companyLogo: { type: String, required: false },
  phoneNumber: { type: String, required: false, default: "" },
  description: { type: String, required: false, default: "" },
    companyImages: {
    type: [String],  
    default: []
  },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee", default: [] }],
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

export const Company = model("Company", companySchema);
