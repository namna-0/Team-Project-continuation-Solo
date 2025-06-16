"use client";
import { toast } from "sonner"
import { ImageSVG } from "./assets/ImageSVG";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmployeeSvg } from "./assets/EmployeeSvg";
// import { useSettings } from "../_providers/CompanySettingsProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { CompanyStatus } from "./CompanyStatus";
import { api } from "@/axios";
import { useParams } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

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

type CompanyType = {
  _id: string;
  companyName: string;
  companyLogo: string
};

export const UploadCompanyLogo = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeesType[]>([]);
  const [employeeCount, setEmployeeCount] = useState<number>();
  const params = useParams();
  const companyName = params?.companyName as string;

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
      toast.success("Зураг амжилттай орууллаа.")
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

  const getCompanyData = async () => {
    try {
      const response = await api.get(`/company`);
      const companies: CompanyType[] = response.data.companies;

      const currentCompany = companies.find(
        (company) => company.companyName === companyName

      );

      if (currentCompany && currentCompany._id) {
        setCompanyId(currentCompany._id);
        setCompanyLogo(currentCompany?.companyLogo)
      } else {
        console.warn("Company not found");
      }
    } catch (error) {
      console.error("Байгууллагын мэдээлэл дуудахад алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    getEmployeeData();
    getCompanyData()
  }, []);

  const handleCompanyData = async () => {
    if (!companyId || !companyLogo) {
      toast.error("Зураг оруулна уу.")
      console.warn("companyId эсвэл зураг алга");
      return;
    }

    try {
      const response = await api.put(`/company/${companyId}`, {
        companyLogo: companyLogo,
      });
      toast.success("Зураг амжилттай шинэчлэгдлээ.")
      console.log("Update success", response.data);
    } catch (error) {
      console.error("Update алдаа:", error);
    }
  };

  return (
    <div className="rounded-2xl w-[20%] h-fit flex flex-col gap-5 ">
      <div className="w-full h-full bg-white rounded-2xl p-4">
        <div className="text-[20px] font-bold">Business logo</div>
        <div className="w-full h-fit flex justify-center p-4">
          <div className="w-[100px] h-[100px] rounded-2xl  bg-[#e4e4e4] overflow-hidden">


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
              <div className="w-full h-full flex flex-col justify-center items-center relative ">
                <div className="absolute ">
                  <img
                    src={`${companyLogo}`}
                    alt="Company Logo Preview"
                    className="w-full h-full object-cover "
                  />
                </div>
                <Input
                  className="w-full h-full opacity-0 "
                  type="file"
                  onChange={handleInputCompanyLogo}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <Button
            className="w-full"
            onClick={handleCompanyData}
            variant={"outline"}
          >
            Upload new logo
          </Button>
        </div>
      </div>

      <CompanyStatus employeeCount={employeeCount ?? 0} />
    </div>
  );
};
