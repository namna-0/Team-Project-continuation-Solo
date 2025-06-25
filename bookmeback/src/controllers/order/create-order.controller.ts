import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";
import { Company } from "../../models/company.schema";
import { User } from "../../models";
import nodemailer from "nodemailer";
export const CreateOrderController: RequestHandler = async (req, res) => {
  try {
    const { company, user, status, employee, selectedTime } = req.body;
    const order = await Booking.create({
      company,
      user,
      status,
      employee,
      selectedTime,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    await Company.findByIdAndUpdate(company, {
      $push: { bookings: order._id },
      $set: { updatedAt: new Date() },
    });

    await User.findByIdAndUpdate(user, {
      $push: { booking: order._id },
      $set: { updatedAt: new Date() },
    });
    const userData = await User.findById(user);
    const companyData = await Company.findById(company);
    const userEmail = userData?.email;
    const companyName = companyData?.companyName;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "mnbookme@gmail.com",
      to: userEmail,
      subject: "Цаг амжилттай захиалагдлаа.",
      html: `<div style="padding: 20px;">
      <h2>Сайн байна уу, ${userEmail}!</h2>
      <p>Таны цаг ${companyName} компани дээр ${selectedTime} цагт амжилттай захиалагдлаа. Манай системийг ашигласанд баярлалаа.</p>
    </div>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "order created", order, userEmail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
    return;
  }
};
