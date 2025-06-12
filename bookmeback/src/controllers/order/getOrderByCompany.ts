
import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";

export const getOrdersByUCompany: RequestHandler = async (req, res) => {

    try {
        const { id } = req.params;
        const bookings = await Booking.find({ company: id })

        if (!bookings || bookings.length === 0) {
            res.status(404).json({ message: "захиалга байхгүй байна." });
            return;
        }

        res.status(200).json({ message: "Нийт захиалгууд дуудагдлаа", bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};