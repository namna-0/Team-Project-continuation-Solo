import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";
import { Company } from "../../models/company.schema";

export const CreateOrderByCompany: RequestHandler = async (req, res) => {
  try {
    const { company, status, employee, selectedTime, duration } = req.body;
    const order = await Booking.create({
      company,
      status,
      employee,
      selectedTime,
      duration,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    await Company.findByIdAndUpdate(company, {
      $push: { bookings: order._id },
      $set: { updatedAt: new Date() },
    });
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
    return;
  }
};
