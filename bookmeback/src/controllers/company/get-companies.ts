import { RequestHandler } from "express";
import { Company } from "../../models/company.schema";

export const getCompaniesController: RequestHandler = async (req, res) => {
  try {
    const companies = await Company.find({})

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
