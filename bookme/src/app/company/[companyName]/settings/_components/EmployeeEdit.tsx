"use client";
import { useParams } from "next/navigation";
import {
  Company,
  EmployeeType,
  useSettings,
} from "../_providers/CompanySettingsProvider";
import { useEffect, useState } from "react";
import { EmployeeCard } from "./EmployeeCard";
import { Button } from "@/components/ui/button";

export const EmployeeEdit = () => {
  const { companyData } = useSettings();
  const { companyName } = useParams();
  const [myCompany, setMyCompany] = useState<Company | null>(null);
  const [companyEmployees, setCompanyEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    if (!companyData || companyData.length === 0) return;

    const foundCompany = companyData.find(
      (company) => company.companyName === companyName
    );
    if (foundCompany) {
      setMyCompany(foundCompany);
      setCompanyEmployees(foundCompany?.employees);
    }
  }, [companyData, companyName]);

  return (
    <div className="w-full h-fit rounded-2xl p-4 flex flex-col gap-4 bg-white">
      <div className="flex flex-col gap-3">
        <div className="text-[20px] font-bold">Ажилтнуудын мэдээлэл</div>
        <div className="w-full flex gap-4">
          <Button variant={"outline"} className="text-[14px] font-normal w-fit">
            Ажилтнуудын мэдээлэл
          </Button>
          <Button variant={"outline"} className="text-[14px] font-normal w-fit">
            Ажилтан засварлах
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {companyEmployees.map((employ, i) => {
          return (
            <div key={employ._id}>
              <EmployeeCard
                employeeName={employ.employeeName}
                description={employ.description}
                profileImage={employ.profileImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
