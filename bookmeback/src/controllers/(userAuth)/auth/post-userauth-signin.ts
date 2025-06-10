import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../../models";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export const postUserAuthSignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.status(404).json({ message: "Email эсвэл нууц үг шалгана уу." });
      return;
    }
    const { password: hashedPassword, ...userWithoutPassword } =
      user.toObject();

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Email эсвэл нууц үг шалгана уу." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
