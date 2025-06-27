"use client";

import { StagOneProps } from "../../../(publicItems)/_OrderPageTypes/types";
import EmployeeCard from "../../../(publicItems)/employeeCard";

export default function StagaOneSelectEmployee({
  company,
  isSelectEmployee,
  setIsSelectEmployee,
  selectedEmployeeImf,
  setSelectedEmployeeImf,
}: StagOneProps) {
  return (
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
            className={`p-2 ${item._id == selectedEmployeeImf
              ? "rounded-xl border bg-gray-300 border-zinc-600"
              : "rounded-xl bg-gray-300/50"
              }`}
          >
            <EmployeeCard
              ner={item.employeeName}
              mergejil={item.description}
              captionText={
                selectedEmployeeImf === item._id
                  ? `${item.employeeName} дээр цаг захиалсан байна`
                  : `${item.employeeName}-д захиалга өгөх`
              }
              zurag={item.profileImage || ""}
            />
          </div>
        ) : null
      )}
    </div>
  );
}
