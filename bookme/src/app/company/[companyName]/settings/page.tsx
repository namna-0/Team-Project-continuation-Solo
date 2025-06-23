"use client";
import { HeaderSection } from "./_components/HeaderSection";
import { UploadCompanyLogo } from "./_components/UploadCompanyLogo";
import { CompanyBasicInformation } from "./_components/CompanyBasicInformation";
import { CompanyWorkingHours } from "./_components/CompanyWorkingHours";
import { CompanyAllEmployees } from "./_components/CompanyAllEmployees";
import { CompanyLocationGetData } from "./_components/CompanyLocationGetData";
import { CompanyImagesSection } from "./_components/CompanyImagesSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#f7f7f7] p-4 gap-2">
      <HeaderSection />
      <div className="w-full border-b-2 pt-3 "></div>
      <div className="w-[1440px] flex justify-between gap-2 ">
        <div className="flex flex-col w-[80%] gap-5">
          <CompanyImagesSection />

          <CompanyBasicInformation />
          <CompanyAllEmployees />
          <CompanyLocationGetData />
          <CompanyWorkingHours />
        </div>
        <UploadCompanyLogo />
      </div>
    </div>
  );
}
