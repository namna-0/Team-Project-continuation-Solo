"use client";
import { ImageSVG } from "./assets/ImageSVG";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeSvg } from "./assets/EmployeeSvg";
// import { useSettings } from "../_providers/CompanySettingsProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { CompanyStatus } from "./CompanyStatus";
import { api } from "@/axios";

export type EmployeesType = {
  employees: EmployeeType[];
};

type EmployeeType = {
  availability: boolean;
  description: string;
  duration: string;
  employeeName: string;
  endTime: string;
  lunchTimeEnd: string;
  lunchTimeStart: string;
  profileImage: string;
  startTime: string;
};

export const UploadCompanyLogo = () => {
  // const { handleInputCompanyLogo, companyLogo } = useSettings();
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeesType[]>([]);
  const [employeeCount, setEmployeeCount] = useState<number>();
  const uploadedImageFunction = async (file: File | null) => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET_DATA!
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const result = response.data.url;

      // return result;
      return response.data.url;
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const handleInputCompanyLogo = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files?.[0];

    if (files) {
      const result = await uploadedImageFunction(files);
      setCompanyLogo(result);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await api.get(`/employee`);
      setEmployeeData(response.data);
      setEmployeeCount(response.data.employees.length || 0);
    } catch (error) {
      console.error("Ажилтны мэдээлэл дуудахад алдаа гарлаа.");
      setEmployeeCount(0);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const handleCompanyData = () => {
    console.log("Hi");
  };

  return (
    <div className="rounded-2xl w-[20%] h-fit flex flex-col gap-5 ">
      <div className="w-full h-full bg-white rounded-2xl p-4">
        <div className="text-[20px] font-bold">Business logo</div>
        <div className="w-full h-fit flex justify-center p-4">
          <div className="w-[100px] h-[100px] rounded-2xl  bg-[#e4e4e4] overflow-hidden">
            {/* {!companyLogo && (
              <div className=" w-full h-full flex flex-col justify-center items-center relative">
                <div className="absolute">
                  <ImageSVG />
                </div>
                <Input
                  className=" w-full h-full opacity-0"
                  type="file"
                  onChange={handleInputCompanyLogo}
                />
              </div>
            )}
            {companyLogo && (
              <img
                src={`${companyLogo}`}
                alt="Company Logo Preview"
                className="w-full h-full"
              />
            )} */}

            {!companyLogo ? (
              <div className="w-full h-full flex flex-col justify-center items-center relative">
                <div className="absolute">
                  <ImageSVG />
                </div>
                <Input
                  className="w-full h-full opacity-0"
                  type="file"
                  onChange={handleInputCompanyLogo}
                />
              </div>
            ) : (
              <img
                src={`${companyLogo}`}
                alt="Company Logo Preview"
                className="w-full h-full object-cover" // object-cover ашиглан зохион байгуулна
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <Button
            className="w-full"
            onClick={handleCompanyData}
            disabled={companyLogo === ""}
            variant={"outline"}
          >
            Upload new logo
          </Button>
        </div>
      </div>
      {/* <div className="w-full bg-white rounded-2xl p-4">
        <div className="text-[20px] font-bold">Business Stats</div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <EmployeeSvg /> Employees
            </div>
            <div>4</div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <EmployeeSvg /> Бусад мэдээлэл +
            </div>
            <div>?</div>
          </div>
        </div>
      </div> */}
      <CompanyStatus employeeCount={employeeCount ?? 0} />
    </div>
  );
};
