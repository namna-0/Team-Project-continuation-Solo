import { RequestHandler } from "express";
import { Company } from "../../models/company.schema";

export const getCompanyByIdController: RequestHandler = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById({ companyId })
      .populate("employees")
      .populate("bookings")
      .populate("users");

    if (!company) {
      res.status(404).json({ message: "Company олдсонгүй" });
      return;
    }
    res.status(200).json({ company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
