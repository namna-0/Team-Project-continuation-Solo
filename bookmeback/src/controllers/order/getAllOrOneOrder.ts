import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";
import { populate } from "dotenv";
import { User } from "../../models";
import { Employee } from "../../models";
import { Company } from "../../models/company.schema";
export const getOrdersAndOrder: RequestHandler = async (req, res) => {

  try {
    const { id } = req.params;
    const bookings = await Booking.find({}).populate("User")

    if (!bookings || bookings.length === 0) {
      res.status(404).json({ message: "ийм захиалга байхгүй байна." });
      return;
    }
    res.status(200).json({ message: "Таны захиалгууд", bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};