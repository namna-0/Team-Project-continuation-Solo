import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";
import { format } from "date-fns";
import { Company } from "../../models/company.schema";

export const CreateOrderController: RequestHandler = async (req, res) => {
  try {
    const { company, user, status, employee, selectedTime } = req.body;
    const parsedDate = new Date(selectedTime);
    if (isNaN(parsedDate.getTime())) {
      res.status(400).json({ message: "Invalid selectedTime format" });
    }
    const formattedSelectedTime = format(parsedDate, "yyyy-MM-dd HH:mm");
    const existingBooking = await Booking.findOne({
      employee,
      selectedTime: formattedSelectedTime,
      status: { $ne: "cancelled" },
    });
    if (existingBooking) {
      res
        .status(409)
        .json({ message: "Тэр цаг аль хэдийн захиалга авсан байна." });
    }

    const order = await Booking.create({
      company,
      user,
      status,
      employee,
      selectedTime: formattedSelectedTime,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    await Company.findByIdAndUpdate(company, {
      $push: { bookings: order._id },
    });

    res.status(201).json({ message: "order created", order });
  } catch (error: any) {
    // Unique index-н алдааг барих
    if (error.code === 11000) {
      console.log();
      res.status(409).json({
        message: "Тэр цаг аль хэдийн захиалга авсан байна (unique index).",
      });
    }
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};
