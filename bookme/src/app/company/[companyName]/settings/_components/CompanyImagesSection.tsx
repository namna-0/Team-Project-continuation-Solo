"use client";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { CompanyImageCard } from "./CompanyImageCard";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { toast } from "sonner";
import { AddCompanyImage } from "./AddCompanyImage";

export const CompanyImagesSection = () => {
  const { company } = useCompanyAuth();

  const [images, setImages] = useState<string[]>([]);

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

  useEffect(() => {
    if (company?.companyImages) {
      setImages(company.companyImages);
    }
  }, [company?.companyImages]);

  return (
    <div className="bg-white w-full rounded-2xl p-4 flex flex-col gap-4">
      <div>
        <div className="text-[20px] font-bold">Нийт зургууд</div>
        <div className="text-[14px] font-normal text-[#aaa]">
          Зураг солих хэсэг
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 justify-between">
        <AddCompanyImage />
        {images.map((image, index) => (
          <div key={index} className="w-[270px] h-[204px] relative">
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
