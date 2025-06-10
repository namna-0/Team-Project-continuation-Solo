import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema({
  companyName: { type: String, required: true, default: "" },
  address: { type: String, required: true, default: "" },
  companyLogo: { type: String, required: true },
  phoneNumber: { type: String, required: true, default: "" },
  description: { type: String, required: true, default: "" },
  companyImages: [{ type: Schema.Types.ObjectId, ref: "Images", default: [] }],
  employeeId: [{ type: Schema.Types.ObjectId, ref: "Employee", default: [] }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const Company = model("Company", companySchema);
