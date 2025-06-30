"use client";

import { StagOneProps } from "../../(publicItems)/_OrderPageTypes/types";
import EmployeeCard from "../../(publicItems)/employeeCard";

export default function StagaOneSelectEmployee({
  company,
  isSelectEmployee,
  setIsSelectEmployee,
  selectedEmployeeImf,
  setSelectedEmployeeImf,
}: StagOneProps) {
  return (
    company?.employees.length > 0  ?
      <div className="grid grid-cols-3 w-fit gap-5 justify-between items-center p-5">
        {company?.employees.map((item, index) =>
          item.availability !== (undefined) && item.availability == (true) ? (
            <div
              key={index}
              onClick={() => {
                if (
                  isSelectEmployee === "" ||
                  isSelectEmployee !== item.employeeName
                ) {
                  setIsSelectEmployee(item.employeeName);
                  setSelectedEmployeeImf(item._id);
                }
              }}
              className={` ${item._id == selectedEmployeeImf
                ? "rounded-xl p-2 border bg-sky-200/50 border-sky-400"
                : "rounded-xl p-2"
                }`}
            >
              <EmployeeCard
                ner={item.employeeName}
                mergejil={item.description}
                captionText={
                  selectedEmployeeImf === item._id
                    ? ``
                    : `${item.employeeName}-д захиалга өгөх`
                }
                zurag={item.profileImage || ""}
              />
            </div>
          ) : null
        )}
      </div>
      : <div className="w-full aspect-8/5 shadow mt-28 rounded-2xl border items-center justify-center">  Захиалга өгөх боломжтой ажилтан байхгүй байна.</div>
  );
}
