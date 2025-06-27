"use client";
import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { UpdateEmployeeProps } from "../../../(publicItems)/_OrderPageTypes/types";
import EmployeeCard from "../../../(publicItems)/employeeCard";
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
        <DialogDescription className="grid grid-cols-3 w-fit gap-5 justify-between items-center p-5">
          {company?.employees.map((item, index) =>
            item.availability !== (undefined) && item.availability == (true) ? (
              <span
                key={index}
                onClick={() => {
                  if (
                    isSelectEmployee === "" ||
                    isSelectEmployee !== item.employeeName
                  ) {
                    setSelectedTime(null)
                    setIsSelectEmployee(item.employeeName);
                    setSelectedEmployee(item._id);
                  }
                }}
                className={`p-2 ${item._id == selectedEmployeeImf
                  ? "rounded-xl border bg-gray-300 border-zinc-600"
                  : "rounded-xl bg-gray-300/50"
                  }`}
              >
                <DialogClose>
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
                </DialogClose>
              </span>
            ) : null
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
export default UpdateEmployee;
