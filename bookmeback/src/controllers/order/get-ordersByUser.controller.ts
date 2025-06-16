import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";

export const getOrdersByUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({ user: id })
      .populate("employe", "name")
      .populate("company", "name image");

    if (!bookings || bookings.length === 0) {
      res.status(404).json({ message: "танид захиалга байхгүй байна." });
      return;
    }
    res.status(200).json({ message: "Таны захиалгууд", bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
