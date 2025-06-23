"use client";
import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CompanyType } from "../../page";
import EmployeeCard from "./employeeCard";
type UpdateEmployeeProps = {
  isSelectEmployee: string | string[];
  zurag?: string;
  company: CompanyType;
  setIsSelectEmployee: (value: string) => void;
  selectedEmployeeImf: string | undefined;
  setSelectedEmployee: (employeeId: string) => void;
  setSelectedTime: (date: Date | null) => void
};
function UpdateEmployee({
  isSelectEmployee,
  company,
  setIsSelectEmployee,
  selectedEmployeeImf,
  setSelectedEmployee,
  setSelectedTime

}: UpdateEmployeeProps) {
  return (
    <DialogContent
      showCloseButton={true}
      className="shadow  rounded-xl   flex border-none p-5"
    >
      <DialogHeader className="flex flex-col gap-9">
        <DialogTitle className="text-wrap w-full ">
          үйлчилгээ авах ажилтанг өөрчлөх гэж байна.
        </DialogTitle>
        <DialogDescription className="grid grid-cols-3  gap-3 justify-between ">
          {company?.employees.map((item, index) => (
            <span
              key={index}
              className={
                item._id == selectedEmployeeImf
                  ? ` relative justify-center flex-1 items-center p-3  rounded-xl border h-full  bg-gray-500/50 shadow-md `
                  : "flex-1 p-3 relative h-full items-center justify-center rounded-xl bg-gray-300/50 "
              }
              onClick={() => {
                if (
                  isSelectEmployee === "" ||
                  item.employeeName !== isSelectEmployee
                )
                  setIsSelectEmployee(item.employeeName);
                setSelectedEmployee(item._id)
                setSelectedTime(null)

              }}
            >
              {item.availability == true && (
                <DialogClose>
                  <EmployeeCard
                    ner={item.employeeName}
                    mergejil={item.description}
                    captionText={
                      isSelectEmployee == item.employeeName
                        ? `${item.employeeName} дээр цаг захиалсан байна`
                        : `${item.employeeName} дээр цаг захиалах`
                    }
                    zurag={item.profileImage || ""}
                  />
                </DialogClose>
              )}
            </span>
          ))}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
export default UpdateEmployee;
