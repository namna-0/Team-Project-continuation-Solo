"use client";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { CompanyImageCard } from "./CompanyImageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSettings } from "../_providers/CompanySettingsProvider";
import { api } from "@/axios";
import { toast } from "sonner";
import { AddCompanyImage } from "./AddCompanyImage";

export const CompanyImagesSection = () => {
  const { company } = useCompanyAuth();
  const { companyAddedImage, handleInputCompanyImage } = useSettings();

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (company?.companyImages) {
      setImages(company.companyImages);
    }
  }, [company?.companyImages]);

  const handleDeleteImage = async (index: number) => {
    try {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);

      await api.put(`/company/${company?._id}`, {
        companyImages: updatedImages,
      });

      toast.success("Зураг амжилттай устгалаа.");
    } catch (error) {
      console.error("Зураг устгахад алдаа гарлаа.", error);
      toast.error("Зураг устгахад алдаа гарлаа.");
    }
  };

  return (
    <div className="bg-white w-full rounded-2xl p-4 flex flex-col gap-4">
      <div>
        <div className="text-[20px] font-bold">Нийт зургууд</div>
        <div className="text-[14px] font-normal text-[#aaa]">
          Зураг солих хэсэг
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 justify-between">
        <div className="relative ">
          <AddCompanyImage />
          <Input
            type="file"
            className="absolute w-full h-full top-0 opacity-0"
            onChange={handleInputCompanyImage}
          />
        </div>

        {images.map((image, index) => (
          <div key={index} className="w-full h-full relative">
            <CompanyImageCard
              image={image}
              index={index}
              newImage={null}
              id={company?._id}
              handleDeleteImage={() => handleDeleteImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
