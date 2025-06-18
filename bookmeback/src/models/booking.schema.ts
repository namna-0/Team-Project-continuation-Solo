import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ["cancelled", "confirmed"],
        default: "confirmed"
    },
    selectedTime: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

export const Booking = model("Booking", bookingSchema);
