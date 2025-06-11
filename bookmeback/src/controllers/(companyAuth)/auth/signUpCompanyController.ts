import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Company } from "../../../models/company.schema";

export const signupCompanyController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email болон нууц үг шаардлагатай" });
      return 
    }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      res.status(409).json({ message: "Email бүртгэлтэй байна" });
      return 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = jwt.sign(
      { companyId: company._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "Бүртгэл амжилттай", company, token });
    return 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Серверийн алдаа", error });
    return 
  }
};
