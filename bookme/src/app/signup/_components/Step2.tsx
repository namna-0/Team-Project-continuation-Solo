"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Upload, X } from "lucide-react";
import { FormDataType } from "../page";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, Step2SchemaType } from "./Schemas";
import { LocPicker } from "@/app/company/[companyName]/userprofile/_components/Location";

type Step2Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  companyImagePreview: string[];
  removeCompanyImage: (index: number) => void;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoPreview: string;
  removeLogo: () => void;
};

export const Step2 = ({
  formData,
  setFormData,
  handleImageChange,
  companyImagePreview,
  handleLogoChange,
  logoPreview,
  removeCompanyImage,
  removeLogo,
}: Step2Props) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<Step2SchemaType>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData,
    mode: "onChange",
  });

  const handleInputChange = async (
    field: keyof Step2SchemaType,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    await trigger(field);
  };

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  useEffect(() => {
    if (formData.address && formData.lat && formData.lng) {
      setLocation({
        lat: formData.lat,
        lng: formData.lng,
        address: formData.address,
      });
    }
  }, [formData]);

  const handleLocationSelect = (loc: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setLocation(loc);
    setFormData((prev) => ({
      ...prev,
      address: loc.address,
      lat: loc.lat,
      lng: loc.lng,
      city: "Улаанбаатар",
    }));
  };

  return (
    <div className="space-y-6 text-white p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Салоны мэдээлэл</h2>

      <div>
        <Label htmlFor="description" className="mb-2">
          Тайлбар
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="bg-white/10 text-white border-white placeholder-white"
          placeholder="Салоныхоо талаар бичнэ үү..."
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2">Хаяг сонгох *</Label>
        <div className="bg-white/10 rounded-lg p-2">
          <LocPicker onSelect={handleLocationSelect} />
        </div>

        {location && (
          <div className="mt-2 p-3 bg-gray-100 rounded-lg text-gray-800">
            <p className="font-medium">Сонгосон хаяг: {location.address}</p>
            <p className="text-sm">
              Координат: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>
        )}
        {errors.address && !location && (
          <p className="text-red-500 text-sm mt-1">Хаяг сонгох шаардлагатай</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address" className="mb-2">
            Хаяг *
          </Label>
          <Input
            {...register("address")}
            id="address"
            value={formData.address}
            readOnly
            className="bg-white/10 text-white border-white"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="city" className="mb-2">
            Хот *
          </Label>
          <Input
            {...register("city")}
            id="city"
            value={formData.city}
            readOnly
            className="bg-white/10 text-white border-white"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-300 bg-black/20 p-2 rounded-lg">
        <p>• Газрын зураг дээр дарж хаягаа сонгоно уу</p>
        <p>• Маркерийг зөөж байршлаа тохируулна уу</p>
        <p>• Дээд талын хайлтын хайрцгаар хаягаа хайж болно</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="mb-2">
            Утас *
          </Label>
          <Input
            {...register("phone")}
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-white/10 text-white border-white placeholder-white"
            placeholder="+976 9911 2233"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="website" className="mb-2">
            Вебсайт
          </Label>
          <Input
            {...register("website")}
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="bg-white/10 text-white border-white placeholder-white"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">
              {errors.website.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label className="mb-2">Салоны лого *</Label>
        <div className="border-2 border-dashed rounded-lg p-4 bg-white/10">
          {logoPreview ? (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Лого"
                className="h-32 w-32 object-contain rounded mx-auto"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative text-center cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-white mb-2" />
              <p className="text-sm text-white">Лого оруулах</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
        {errors.logo && (
          <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-2">Салоны зургууд (олон зураг)</Label>
        <div className="border-2 border-dashed rounded-lg p-4 bg-white/10">
          {companyImagePreview.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {companyImagePreview.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Зураг ${index + 1}`}
                      className="h-24 w-full object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeCompanyImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative text-center cursor-pointer mt-4">
                <Upload className="w-6 h-6 mx-auto text-white" />
                <p className="text-sm text-white">Нэмэлт зураг оруулах</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <div className="relative text-center cursor-pointer">
              <Upload className="w-6 h-6 mx-auto text-white" />
              <p className="text-sm text-white">Зургууд оруулах</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
