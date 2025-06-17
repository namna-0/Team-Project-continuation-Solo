"use client";

import { DialogClose } from "@/components/ui/dialog";
import { CompanyType, employeeType } from "../../page";
import EmployeeCard from "./employeeCard";

type StagOneProps = {
  company: CompanyType;
  isSelectEmployee: string;
  setIsSelectEmployee: (employee: string) => void;
};
export default function StagaOneSelectEmployee({
  company,
  isSelectEmployee,
  setIsSelectEmployee,
}: StagOneProps) {
  const i = company?.employees.find(
    (employee) => employee.employeeName === isSelectEmployee
  );
  return (
    <div className="flex w-fit gap-10 justify-between ">
      {company?.employees.map((item, index) => (
        <div
          key={index}
          className={
            item.employeeName == i?.employeeName
              ? ` relative justify-center flex-1 items-center w-full p-3  rounded-xl border h-fit border-sky-600`
              : "  flex-1 p-3 relative h-fit items-center justify-center w-full rounded-xl  border border-gray-400"
          }
          onClick={() => {
            if (
              i?.employeeName === "" ||
              i?.employeeName !== item.employeeName
            ) {
              setIsSelectEmployee(item.employeeName);
            }
          }}
        >
          {item.availability == true && (
            <EmployeeCard
              ner={item.employeeName}
              mergejil={item.description}
              captionText={
                i?.employeeName == item.employeeName
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
