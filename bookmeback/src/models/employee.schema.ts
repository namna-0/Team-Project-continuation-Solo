import mongoose from "mongoose";
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
//   companyId: {
//     type: Number,
//     required: true,
//   },
  employeeName: { type: String, required: true, default: "" },
  description: { type: String, default: "" },
  profileImage: { type: String },
  availability: [{ type: Schema.Types.ObjectId, ref: "Availability", default: [] }],
  duration: { type: String, required: true },
  workingHours: { type: String, default: "08:00-18:00" },
});

export const Employee = model("Employee", employeeSchema);
