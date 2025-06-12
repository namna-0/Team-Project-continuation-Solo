import { RequestHandler } from "express";
import { Company } from "../../models/company.schema";
import "../../models/employee.schema";

export const getCompaniesController: RequestHandler = async (_req, res) => {
  try {
    const companies = await Company.find({}).populate("employees");

    if (!companies || companies.length === 0) {
      res.status(404).json({ message: "Компани бүртгэлгүй байна" });
      return;
    }

    res.status(200).json({ companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
