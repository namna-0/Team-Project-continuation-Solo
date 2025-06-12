import { RequestHandler } from "express";
import { Employee } from "../../models/employee.schema";

export const createEmployee: RequestHandler = async (req, res) => {
  try {
    const {
      employeeName,
      description,
      profileImage,
      availability,
      duration,
      workingHours,
    } = req.body;
    if (
      !employeeName ||
      !description ||
      !profileImage ||
      !availability ||
      !duration ||
      !workingHours
    ) {
      res.status(400).json({ message: "Бүх мэдээллийг бөглөнө үү." });
      return;
    }
    // if (!Array.isArray(profileImage) || profileImage.length === 0) {
    //   res.status(400).json({ message: "Ажилтны зураг оруулна уу." });
    //   return;
    // }

    const employee = await Employee.create({
      employeeName,
      description,
      profileImage,
      availability,
      duration,
      workingHours,
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

//   employeeName: { type: String, required: true, default: "" },
//   description: { type: String, default: "" },
//   profileImage: { type: String },
//   availability: { type: Boolean },
//   duration: { type: String, required: true },
//   workingHours: { type: String, default: "08:00-18:00" },
