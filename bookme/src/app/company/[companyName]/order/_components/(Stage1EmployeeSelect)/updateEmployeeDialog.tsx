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
  isSelectEmployee: string;
  zurag?: string;
  company: CompanyType;
  setIsSelectEmployee: (value: string) => void;
};
function UpdateEmployee({
  isSelectEmployee,
  company,
  setIsSelectEmployee,
}: UpdateEmployeeProps) {
  return (
    <DialogContent
      showCloseButton={false}
      className="shadow rounded-xl w-full border-none p-6"
    >
      <DialogHeader className="flex flex-col gap-9">
        <DialogTitle className="text-wrap w-full ">
          үйлчилгээ авах ажилтанг өөрчлөх гэж байна.
        </DialogTitle>
        <DialogDescription className="flex w-fit gap-10 justify-between ">
          {company?.employees.map((item, index) => (
            <span
              key={index}
              className={
                item.employeeName == isSelectEmployee
                  ? ` relative flex-1  justify-center w-full p-5 rounded-xl bg-clip-border md:bg-clip-padding border  border-sky-600`
                  : " relative flex-1 justify-center w-full p-5 rounded-xl bg-clip-border md:bg-clip-padding border border-gray-400"
              }
              onClick={() => {
                if (
                  isSelectEmployee === "" ||
                  isSelectEmployee !== item.employeeName
                )
                  setIsSelectEmployee(item.employeeName);
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
                    zurag="/images.jpeg"
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
