"use client";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { CompanyImageCard } from "./CompanyImageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSettings } from "../_providers/CompanySettingsProvider";

export const CompanyImagesSection = () => {
  const { company } = useCompanyAuth();
  const { companyAddedImage, handleInputCompanyImage } = useSettings();
  const [newImage, setNewImage] = useState<File | null>(null);

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
          <Button
            variant={"outline"}
            className="w-full h-full rounded-3xl flex flex-col items-center justify-center "
          >
            <span>Зураг нэмэх</span>
            <span>+</span>
          </Button>
          <Input
            type="file"
            className="absolute w-full h-full top-0 opacity-0"
            onChange={handleInputCompanyImage}
          />
        </div>
        {company?.companyImages &&
          company?.companyImages.map((image, index) => {
            return (
              <div key={index} className="w-full h-full relative">
                <CompanyImageCard
                  image={image}
                  index={index}
                  newImage={newImage}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
