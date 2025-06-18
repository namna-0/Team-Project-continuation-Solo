"use client";

import { Button } from "@/components/ui/button";
import {
  EmployeeType,
  useSettings,
} from "../_providers/CompanySettingsProvider";
import { useEffect, useState } from "react";
import { PenSvg } from "./assets/PenSvg";
import { api } from "@/axios";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { EmployeeEditCard } from "./EmployeeEditCard";

type PropsType = {
  companyEmployees: EmployeeType[];
};

export const EmployeeEditForm = ({ companyEmployees }: PropsType) => {
  const [editStates, setEditStates] = useState<boolean[]>(
    companyEmployees.map(() => true)
  );

  const [employeeData, setEmployeeData] = useState<
    { employeeName: string; description: string; _id: string }[]
  >([]);

  //   const toggleEdit = (index: number) => {
  //     setEditStates((prev) =>
  //       prev.map((value, i) => (i === index ? !value : value))
  //     );
  //   };

  //   const handleInputChange = (
  //     index: number,
  //     field: "employeeName" | "description",
  //     value: string
  //   ) => {
  //     setEmployeeData((prev) =>
  //       prev.map((emp, i) => (i === index ? { ...emp, [field]: value } : emp))
  //     );
  //   };

  //   const handleChangeEmployeeData = async (index: number) => {
  //     const emp = employeeData[index];
  //     try {
  //       const updated = employeeData[index];
  //       await api.put(`/employee/${emp._id}`, updated);

  //       setEditStates((prev) => prev.map((val, i) => (i === index ? true : val)));
  //       toast.success("Ажилтны мэдээлэл амжилттай солигдлоо.");
  //     } catch (error) {
  //       console.error("Ажилтны мэдээлэл өөрчлөхөд алдаа гарлаа.");
  //       toast.error("Ажилтны мэдээлэл өөрчлөхөд алдаа гарлаа.");
  //     }
  //   };

  useEffect(() => {
    if (companyEmployees.length > 0) {
      setEditStates(companyEmployees.map(() => true));
    }
  }, [companyEmployees]);

  return (
    <div className="flex flex-col gap-3 ">
      {companyEmployees.map((employee, i) => {
        return (
          <div key={employee._id}>
            <EmployeeEditCard employee={employee} employeeIndex={i} />
          </div>
        );
      })}
    </div>
  );
};
