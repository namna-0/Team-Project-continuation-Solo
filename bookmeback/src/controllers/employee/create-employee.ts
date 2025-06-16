import { RequestHandler } from "express";
import { Employee } from "../../models/employee.schema";

export const createEmployee: RequestHandler = async (req, res) => {
  try {
    const {
      companyName,
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
    if (
      !companyName ||
      !employeeName ||
      !description ||
      !profileImage ||
      !availability ||
      !duration ||
      !startTime ||
      !endTime ||
      !lunchTimeStart ||
      !lunchTimeEnd
    ) {
      res.status(400).json({ message: "Бүх мэдээллийг бөглөнө үү." });
      return;
    }
    // if (!Array.isArray(profileImage) || profileImage.length === 0) {
    //   res.status(400).json({ message: "Ажилтны зураг оруулна уу." });
    //   return;
    // }
    const employee = await Employee.create({
      companyName,
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
    res.status(200).json({ message: "Ажилтан амжилттай үүслээ.", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Серверийн алдаа!!!" });
    return;
  }
};
