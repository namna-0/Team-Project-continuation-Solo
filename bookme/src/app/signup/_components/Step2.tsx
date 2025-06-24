"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataType } from "./Types";
import { z } from "zod";
import { step2Schema } from "./Schemas";

type Step2SchemaType = z.infer<typeof step2Schema>;

type Step2Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  errors?: Record<string, string[]>;
};

export const Step2 = ({ formData, setFormData, errors = {} }: Step2Props) => {
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
        <Label htmlFor="experience" className="block mb-2 text-white">
          Тогвортой ажилласан жил
        </Label>
        <Input
          {...register("experience")}
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          className="bg-white/10 text-white border-white/30 placeholder-white/70 focus:border-white/50 focus:ring-white/20"
          placeholder="10"
        />
        {(formErrors.experience || errors.experience) && (
          <p className="text-red-400 text-sm mt-1">
            {formErrors.experience?.message || errors.website?.[0]}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="block mb-2 text-white">
          Нийт үйлчлүүлэгчдийн тоо
        </Label>
        <Input
          {...register("clientNumber")}
          id="clientNumber"
          type="number"
          value={formData.clientNumber}
          onChange={(e) => handleInputChange("clientNumber", e.target.value)}
          className="bg-white/10 text-white border-white/30 placeholder-white/70 focus:border-white/50 focus:ring-white/20"
          placeholder="100"
        />
        {(formErrors.clientNumber || errors.clientNumber) && (
          <p className="text-red-400 text-sm mt-1">
            {formErrors.clientNumber?.message || errors.clientNumbers?.[0]}
          </p>
        )}
      </div>
    </div>
  );
};
