import { RequestHandler } from "express";
import { User } from "../../../models";
import bcrypt from "bcrypt";
export const VerifyResetCode: RequestHandler = async (req, res) => {
  try {
    const { email, code, newpassword } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetCode !== code ||
      !user.resetCodeExpires ||
      Date.now() > user.resetCodeExpires.getTime()
    ) {
      res.status(400).json({ message: "Буруу эсвэл хугацаа нь дууссан код." });
      return;
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Нууц үг амжилттай шинэчлэгдлээ." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};
