import cron from "node-cron";
import nodemailer from "nodemailer";
import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";
import { populate } from "dotenv";
import { Employee } from "../../models";
import { Company } from "../../models/company.schema";
import { User } from "../../models";
export const getBookings: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({}).populate("user");

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
const postMail: RequestHandler = async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mnbookme@gmail.com",
      pass: "gssz sdqi lteq hpaw",
    },
  });

  const mailOptions = {
    from: "mnbookme@gmail.com",
    to,
    subject,
    html: `
      <div style="padding: 20px;">
        <h2>Сайн байна уу!</h2>
        <p>${text}</p>
        <a href="https://bookme.mn/login">Нэвтрэх</a>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email failed to send" });
  }
};
