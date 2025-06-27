import cron from "node-cron";
import nodemailer from "nodemailer";
import { RequestHandler } from "express";
import { Booking } from "../../models/booking.schema";
import { populate } from "dotenv";
import { Employee } from "../../models";
import { Company } from "../../models/company.schema";
import { User } from "../../models";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "mnbookme@gmail.com", pass: "gssz sdqi lteq hpaw" },
});

const sendReminderEmail = async (booking: any) => {
  try {
    const mailOptions = {
      from: "mnbookme@gmail.com",
      to: booking.user.email,
      subject: "Цаг захиалгын сануулга - BookMe",
      html: `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>Сайн байна уу, ${booking.user.name}!</h2>
          <p>Та 3 цагийн дараа цаг захиалгатай байна.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Захиалгын мэдээлэл:</h3>
            <p><strong>Огноо:</strong> ${new Date(
              booking.date
            ).toLocaleDateString("mn-MN")}</p>
            <p><strong>Цаг:</strong> ${booking.time}</p>
            <p><strong>Үйлчилгээ:</strong> ${booking.service}</p>
            <p><strong>Ажилтан:</strong> ${
              booking.employee?.name || "Тодорхойгүй"
            }</p>
            <p><strong>Компани:</strong> ${
              booking.company?.name || "Тодорхойгүй"
            }</p>
          </div>
          <p>Хэрэв та цагаа цуцлах эсвэл өөрчлөх шаардлагатай бол доорх холбоосоор орж үүднэ үү.</p>
          <a href="https://bookme.mn/bookings" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Захиалга харах</a>
          <br><br>
          <p>Баярлалаа,<br>BookMe багийнхан</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${booking.user.email}:`, info.response);
  } catch (error) {
    console.error(
      `Error sending reminder email to ${booking.user.email}:`,
      error
    );
  }
};
