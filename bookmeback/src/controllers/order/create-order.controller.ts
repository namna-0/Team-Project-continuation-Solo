import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";

export const CreateOrderController: RequestHandler = async (req, res) => {
    try {
        const {
            company,
            user,
            status,
            employee,
            selectedTime
        } = req.body;

        if (!company || !user || !selectedTime || !employee) {
            res.status(400).json({ message: "Бүх талбарыг бөглө" })
            return;
        }
        const order = await Booking.create({
            company,
            user,
            status,
            employee,
            selectedTime,
            updatedAt: new Date(),
            createdAt: new Date()
        })
        res.status(201).json({ message: "order created", order })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error creating order" });
        return
    }
}
