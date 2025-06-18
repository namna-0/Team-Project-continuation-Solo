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
  // const [editStates, setEditStates] = useState<boolean[]>(
  //   companyEmployees.map(() => true)
  // );

  // useEffect(() => {
  //   if (companyEmployees.length > 0) {
  //     setEditStates(companyEmployees.map(() => true));
  //   }
  // }, [companyEmployees]);

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
