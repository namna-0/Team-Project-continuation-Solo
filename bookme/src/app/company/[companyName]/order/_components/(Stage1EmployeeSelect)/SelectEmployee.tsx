"use client";

import { CompanyType } from "@/app/company/[companyName]/order/page";
import EmployeeCard from "./employeeCard";


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

  return (
    <div className=" grid grid-cols-3 w-fit gap-5 justify-between items-center p-5">
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
              ? ` relative justify-start flex h-full items-start p-3  rounded-xl border   bg-gray-300   border-zinc-600`
              : " p-3 relative h-full flex items-start justify-start rounded-xl bg-gray-300/50 "
          }
        >
          {item.availability == true && (
            <EmployeeCard
              ner={item.employeeName}
              mergejil={item.description}
              captionText={
                selectedEmployeeImf == item._id
                  ? `${item.employeeName} дээр цаг захиалсан байна`
                  : ` ${item.employeeName}-д захиалга өгөх`
              }
              zurag={item.profileImage || ""}
            />
          )}
        </div>
      ))}
    </div>
  );
}
