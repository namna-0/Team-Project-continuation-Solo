"use client";

import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const CompanyBasicInformation = () => {
  const { company } = useCompanyAuth()
  const [updatedCompany, setUpdatedCompany] = useState({
    companyName: company?.companyName,
    email: company?.email
  })




  const handleChangeData = async () => {
    try {
      const updateData = await api.put("/company")

    } catch (error) {
      console.error("Компанийн мэдээлэл шинэчлэхэд алдаа гарлаа.", error);
      toast.error("Компанийн мэдээлэл шинэчлэхэд алдаа гарлаа.")
    }

  }




  return (
    <div className="bg-white w-full rounded-2xl p-4 flex flex-col gap-4">
      <div>
        <div className="text-[20px] font-bold">Basic information</div>
        <div className="text-[14px] font-normal text-[#aaa]">
          Update your business details.
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[17px] font-semibold">Компанийн нэр</p>
          <Input value={updatedCompany.companyName} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[17px] font-semibold">Цахим хаяг</p>
          <Input value={updatedCompany.email} />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Button onClick={handleChangeData}>Хадгалах</Button>
      </div>
    </div>
  );
};
