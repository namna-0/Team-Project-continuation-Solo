import { RequestHandler } from "express";
import { User } from "../../../models";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const Forgotpass: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      res.status(404).json({ message: "Бүртгэлгүй Email хаяг байна." });
      return;
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const resetLink = `http://localhost:3000/company/[companyName]/forgotpassword/${oldUser._id}/${token}`;
    console.log("link", resetLink);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Нууц үг сэргээх холбоос",
      html: `
        <h2>Сайн байна уу, ${oldUser.username}!</h2>
        <p>Доорх холбоосоор нууц үгээ шинэчлэнэ үү:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Линк 5 минутын хугацаанд хүчинтэй байна.</p>
      `,
    });
    res.status(200).json({ message: "Линк илгээгдлээ.", resetLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};
