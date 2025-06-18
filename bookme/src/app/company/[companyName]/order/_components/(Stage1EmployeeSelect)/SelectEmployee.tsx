"use client";

import { CompanyType } from "@/app/company/[companyName]/order/page";
import EmployeeCard from "./employeeCard";
import { useParams } from "next/navigation";
import { api } from "@/axios";
import { useEffect, useState } from "react";

type StagOneProps = {
  company: CompanyType;
  isSelectEmployee: string | string[];
  setIsSelectEmployee: (employee: string) => void;
  selectedEmployeeImf: string | undefined;
  setSelectedEmployeeImf: (employeeId: string) => void;
};
export default function StagaOneSelectEmployee({
  company,
  isSelectEmployee,
  setIsSelectEmployee,
  selectedEmployeeImf, setSelectedEmployeeImf
}: StagOneProps) {
  const { companyName } = useParams()
  return (
    <div className="flex w-fit gap-10 justify-between ">
      {company?.employees.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (
              isSelectEmployee === "" ||
              isSelectEmployee !== item.employeeName
            ) {
              setIsSelectEmployee(item.employeeName);
              setSelectedEmployeeImf(item._id)
            }
          }}
          className={
            item._id == selectedEmployeeImf
              ? ` relative justify-center flex-1 items-center w-full p-3  rounded-xl border h-fit border-sky-600`
              : "  flex-1 p-3 relative h-fit items-center justify-center w-full rounded-xl  border border-gray-400"
          }
        >
          {item.availability == true && (
            <EmployeeCard
              ner={item.employeeName}
              mergejil={item.description}
              captionText={
                selectedEmployeeImf == item._id
                  ? `${item.employeeName} дээр цаг захиалсан байна`
                  : ` ${item.description}  ${item.employeeName}-д захиалга өгөх`
              }
              zurag="/images.jpeg"
            />
          )}
        </div>
      ))}
    </div>
  );
}
