import { Button } from "@/components/ui/button";
import { EmployeeType } from "../_providers/CompanySettingsProvider";

export const EmployeeCard = ({
  employeeName,
  description,
  profileImage,
}: EmployeeType) => {
  console.log(profileImage);

  return (
    <div className="w-full h-full bg-[#f7f7f7] rounded-4xl flex flex-col justify-between items-center p-5">
      <img src={`${profileImage}`} />
      <div className="bg-white p-3 rounded-2xl">{employeeName}</div>
      <div className="bg-white p-3 rounded-2xl">{description}</div>
    </div>
  );
};
