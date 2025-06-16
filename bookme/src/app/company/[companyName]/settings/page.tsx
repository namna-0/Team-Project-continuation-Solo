"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { HeaderSection } from "./_components/HeaderSection";
import { UploadCompanyLogo } from "./_components/UploadCompanyLogo";
import { CompanyBasicInformation } from "./_components/CompanyBasicInformation";
import { CompanyWorkingHours } from "./_components/CompanyWorkingHours";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#f7f7f7] p-4 gap-2">
      <HeaderSection />
      <div className="w-full border-b-2 pt-3 "></div>
      <div className="w-[1440px] p-4 flex gap-2">
        <Button>Profile</Button>
        <Button>Employee Management</Button>
      </div>
      <div className="w-[1440px] flex justify-between gap-2 ">
        <div className="flex flex-col w-[80%] gap-5">
          <div className="bg-white w-full rounded-2xl p-4 flex flex-col gap-4">
            <div>
              <div className="text-[20px] font-bold">Basic information</div>
              <div className="text-[14px] font-normal text-[#aaa]">
                Update your business details.
              </div>
            </div>
            <CompanyBasicInformation />
          </div>
          <CompanyWorkingHours />
        </div>
        <UploadCompanyLogo />
      </div>
    </div>
  );
}
