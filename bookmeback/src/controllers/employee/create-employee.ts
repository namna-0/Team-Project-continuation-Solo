import { RequestHandler } from "express";
import { Employee } from "../../models";
import { Company } from "../../models/company.schema";

export const createEmployee: RequestHandler = async (req, res) => {
  const { companyName } = req.params;
  console.log("companyName from params:", companyName);
  console.log("req.body:", req.body);

  const {
    employeeName,
    description,
    profileImage,
    availability,
    duration,
    startTime,
    endTime,
    lunchTimeStart,
    lunchTimeEnd,
  } = req.body;

  // if (
  //   !employeeName ||
  //   !description ||
  //   !profileImage ||
  //   availability === undefined ||
  //   !duration ||
  //   !startTime ||
  //   !endTime ||
  //   !lunchTimeStart ||
  //   !lunchTimeEnd
  // ) {
  //   res.status(400).json({ message: "Бүх мэдээллийг бөглөнө үү." });
  //   return;
  // }

  try {
    const company = await Company.findOne({ companyName });

    if (!company) {
      res.status(404).json({ message: "Компани олдсонгүй" });
      return;
    }

    const employee = await Employee.create({
      employeeName,
      description,
      profileImage,
      availability,
      duration,
      startTime,
      endTime,
      lunchTimeStart,
      lunchTimeEnd,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    company.employees.push(employee._id);
    await company.save();

    res.status(200).json({ message: "Ажилтан амжилттай үүслээ.", employee });
  } catch (error) {
    console.error("CreateEmployee error:", error);
    res.status(500).json({
      message: "Серверийн алдаа!!!",
      error: error instanceof Error ? error.message : error,
    });
  }
};
