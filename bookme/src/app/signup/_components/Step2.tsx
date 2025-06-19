"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataType } from "./Types";
import { LocPicker } from "@/app/company/[companyName]/userprofile/_components/Location";
import { z } from "zod";
import { step2Schema } from "./Schemas";

type Step2SchemaType = z.infer<typeof step2Schema>;

type Step2Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  companyImagePreview: string[];
  removeCompanyImage: (index: number) => void;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoPreview: string;
  removeLogo: () => void;
  errors?: Record<string, string[]>;
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
  errors = {},
}: Step2Props) => {
  const {
    register,
    formState: { errors: formErrors },
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
      <h2 className="text-xl font-bold mb-2">Компаний мэдээлэл</h2>

      <div>
        <Label htmlFor="description" className="block mb-2 text-white">
          Тайлбар
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="bg-white/10 text-white border-white placeholder-white/70 focus:border-white/50 focus:ring-white/20"
          placeholder="Компанийхаа талаар бичнэ үү..."
          rows={3}
        />
        {(formErrors.description || errors.description) && (
          <p className="text-red-400 text-sm mt-1">
            {formErrors.description?.message || errors.description?.[0]}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label className="block mb-2 text-white">Хаяг сонгох *</Label>
        <div className="bg-white/5 rounded-lg p-3 border border-white/20">
          <LocPicker onSelect={handleLocationSelect} />
        </div>

        {(formErrors.address || errors.address) && !location && (
          <p className="text-red-400 text-sm mt-1">
            {formErrors.address?.message ||
              errors.address?.[0] ||
              "Хаяг сонгох шаардлагатай"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address" className="block mb-2 text-white">
            Хаяг *
          </Label>
          <Input
            {...register("address")}
            id="address"
            value={formData.address}
            readOnly
            className="bg-white/10 text-white border-white/30 focus:border-white/50 cursor-default"
            placeholder="Хаяг сонгосны дараа харагдана"
          />
          {(formErrors.address || errors.address) && (
            <p className="text-red-400 text-sm mt-1">
              {formErrors.address?.message || errors.address?.[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="city" className="block mb-2 text-white">
            Хот *
          </Label>
          <Input
            {...register("city")}
            id="city"
            value={formData.city}
            readOnly
            className="bg-white/10 text-white border-white/30 focus:border-white/50 cursor-default"
            placeholder="Автоматаар бөглөгдөнө"
          />
          {(formErrors.city || errors.city) && (
            <p className="text-red-400 text-sm mt-1">
              {formErrors.city?.message || errors.city?.[0]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="block mb-2 text-white">
            Утас *
          </Label>
          <Input
            {...register("phone")}
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-white/10 text-white border-white/30 placeholder-white/70 focus:border-white/50 focus:ring-white/20"
            placeholder="9911 2233"
          />
          {(formErrors.phone || errors.phone) && (
            <p className="text-red-400 text-sm mt-1">
              {formErrors.phone?.message || errors.phone?.[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="website" className="block mb-2 text-white">
            Вебсайт
          </Label>
          <Input
            {...register("website")}
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="bg-white/10 text-white border-white/30 placeholder-white/70 focus:border-white/50 focus:ring-white/20"
            placeholder="https://example.com"
          />
          {(formErrors.website || errors.website) && (
            <p className="text-red-400 text-sm mt-1">
              {formErrors.website?.message || errors.website?.[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label className="block mb-2 text-white">Компаний лого *</Label>
        <div className="border-2 border-dashed border-white/30 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors">
          {logoPreview ? (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Лого"
                className="h-32 w-32 object-contain rounded mx-auto bg-white/10 p-2"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative text-center cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-white/70 mb-2" />
              <p className="text-sm text-white/70">Лого оруулах</p>
              <p className="text-xs text-white/50 mt-1">
                PNG, JPG, JPEG форматтай файл
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
        {(formErrors.logo || errors.logo) && (
          <p className="text-red-400 text-sm mt-1">
            {formErrors.logo?.message || errors.logo?.[0]}
          </p>
        )}
      </div>

      <div>
        <Label className="block mb-2 text-white">
          Компаний зургууд (олон зураг)
        </Label>
        <div className="border-2 border-dashed border-white/30 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors">
          {companyImagePreview.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {companyImagePreview.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Зураг ${index + 1}`}
                      className="h-24 w-full object-cover rounded bg-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeCompanyImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative text-center cursor-pointer border-t border-white/20 pt-4">
                <Upload className="w-6 h-6 mx-auto text-white/70 mb-1" />
                <p className="text-sm text-white/70">Нэмэлт зураг оруулах</p>
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
            <div className="relative text-center cursor-pointer py-8">
              <Upload className="w-8 h-8 mx-auto text-white/70 mb-2" />
              <p className="text-sm text-white/70">Зургууд оруулах</p>
              <p className="text-xs text-white/50 mt-1">
                Олон зураг сонгож болно
              </p>
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
        <p className="text-[15px] text-white mt-[3px]">
          Эхний зураг нь website-н cover зураг болох тул чанартай зураг сонгоно
          уу. Компаний орчин, хамт олны зураг, хэрэглэгчдэд харуулахыг хүссэн
          зургаа оруулна уу.
        </p>
      </div>
    </div>
  );
};
