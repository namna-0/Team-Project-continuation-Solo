import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { User } from "../../../models";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export const postUserAuthSignUp: RequestHandler = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 2);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Бүртгэл амжилттай, нэвтэрсэн!",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Бүртгэл амжилтгүй боллоо" });
  }
};
