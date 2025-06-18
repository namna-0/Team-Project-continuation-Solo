import { Button } from "@/components/ui/button";
import { EmployeeType } from "../_providers/CompanySettingsProvider";

export const EmployeeCard = (
  {
    employeeName,
    description,
    profileImage,
  }: EmployeeType
) => {
  console.log(profileImage);

  return (
    <div className="w-full h-full bg-[#f7f7f7] rounded-4xl flex flex-col justify-between items-center p-5 gap-3">
      <img src={`${profileImage}`} className="rounded-2xl" />
      <div className="w-full  rounded-2xl px-3 ">
        <div className="bg-white w-fit rounded-2xl p-3 ">  Нэр: {employeeName}</div>
      </div>
      <div className="w-full  rounded-2xl px-3 ">
        <div className="bg-white w-full rounded-2xl p-3 ">  Танилцуулга: {description}</div>
      </div>
    </div>
  );
};
