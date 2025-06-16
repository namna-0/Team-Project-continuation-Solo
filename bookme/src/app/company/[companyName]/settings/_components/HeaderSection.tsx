"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { EmployeeForm } from "./EmployeeForm";

export type FormDataType = {
  employeeData: EmployeeData;
  setEmployeeData: React.Dispatch<React.SetStateAction<EmployeeData>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type EmployeeData = {
  companyName: string;
  startTime: string;
  endTime: string;
  lunchTimeStart: string;
  lunchTimeEnd: string;
  employeeName: string;
  description: string;
  profileImage: string;
  availability: boolean;
  duration: string;
  workingHours: string;
};

export const HeaderSection = () => {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    companyName: "",
    startTime: "",
    endTime: "",
    lunchTimeStart: "",
    lunchTimeEnd: "",
    employeeName: "",
    description: "",
    profileImage: "",
    availability: true,
    duration: "",
    workingHours: "",
  });

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div className="w-[1440px] bg-white rounded-2xl">
      <div className="flex justify-between items-center p-4">
        <div>
          <div className="text-[20px] font-medium">Organization Management</div>
          <div className="text-[14px] font-normal text-gray-400">
            Manage your business profile and team
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Add employee</Button>
          </DialogTrigger>
          <DialogContent className="bg-white w-[600px]">
            <DialogHeader>
              <DialogTitle>Ажилтан шинээр бүртгэх</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              employeeData={employeeData}
              setEmployeeData={setEmployeeData}
              setOpen={closeDialog}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
