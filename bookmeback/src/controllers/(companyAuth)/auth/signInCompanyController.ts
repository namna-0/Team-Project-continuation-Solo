import { RequestHandler } from "express";
import { Company } from "../../../models/company.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInCompanyController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      res
        .status(404)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна" });
        return 
    }

    const storedPassword = company.password;
    if (!storedPassword) {
      res.status(500).json({ message: "Нууц үг олдсонгүй" });
      return 
    }

    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    if (!isPasswordMatch) {
       res
        .status(401)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна" });
        return
    }
    const { password: _, ...userWithoutPassword } = company.toObject();

    const token = jwt.sign(
      { companyId: company._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

   res.status(200).json({ user: userWithoutPassword, token });
    return 
  } catch (error) {
    res.status(500).json({ message: "Сервер дээр алдаа гарлаа", error });
    return 
  }
};
