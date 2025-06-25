"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FullSchemaType } from "./Schemas";
import { FormDataType } from "./Types";
import { LocPickerCompany } from "./LocPicker";

type Step5Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const Step5 = ({ formData, setFormData }: Step5Props) => {
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<FullSchemaType>();

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

    // ✅ Register values in RHF
    setValue("address", loc.address, { shouldValidate: true });
    setValue("city", "Улаанбаатар", { shouldValidate: true });
    setValue("lat", loc.lat); // 🟢
    setValue("lng", loc.lng); // 🟢

    // ✅ Validate
    trigger(["address", "city", "lat", "lng"]);

    // ✅ Update formData state
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
      <h2 className="text-xl font-bold mb-2">Байршлын мэдээлэл</h2>

      <div>
        <Label className="block mb-2 text-white">Хаяг сонгох *</Label>
        <div
          className={`bg-white/5 rounded-lg p-3 border ${
            errors.address ? "border-red-500" : "border-white/20"
          }`}
        >
          <LocPickerCompany
            onSelect={handleLocationSelect}
            defaultLocation={
              formData.lat && formData.lng
                ? {
                    lat: formData.lat,
                    lng: formData.lng,
                    address: formData.address,
                  }
                : undefined
            }
          />
        </div>

        {errors.address && !location && (
          <p className="text-red-400 text-sm mt-1">
            {errors.address.message || "Хаяг сонгох шаардлагатай"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address" className="block mb-2 text-white">
            Хаяг *
          </Label>
          <Input
            id="address"
            value={formData.address}
            readOnly
            className="bg-white/10 text-white border-white/30 focus:border-white/50 cursor-default"
            placeholder="Хаяг сонгосны дараа харагдана"
          />
          {errors.address && (
            <p className="text-red-400 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="city" className="block mb-2 text-white">
            Хот *
          </Label>
          <Input
            id="city"
            value={formData.city}
            readOnly
            className="bg-white/10 text-white border-white/30 focus:border-white/50 cursor-default"
            placeholder="Автоматаар бөглөгдөнө"
          />
          {errors.city && (
            <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
