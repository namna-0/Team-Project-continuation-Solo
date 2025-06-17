"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1SchemaType } from "./Schemas";
import { FormDataType } from "./Types";

type Step1Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const Step1 = ({ formData, setFormData }: Step1Props) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<Step1SchemaType>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
    mode: "onChange",
  });

  const handleInputChange = async (
    field: keyof Step1SchemaType,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    await trigger(field);
  };

  return (
    <div className="space-y-6 text-white p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Бүртгэлийн мэдээлэл</h2>

      <div>
        <Label htmlFor="email" className="mb-2">
          Имэйл *
        </Label>
        <Input
          {...register("email")}
          placeholder="ta@example.com"
          className="bg-white/10 text-white border-white placeholder-white"
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">
          Нууц үг *
        </Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="bg-white/10 text-white border-white placeholder-white"
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="mb-2">
          Нууц үг давтах *
        </Label>
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          className="bg-white/10 text-white border-white placeholder-white"
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="companyName" className="mb-2">
          Салоны нэр *
        </Label>
        <Input
          {...register("companyName")}
          placeholder="Салоны нэр"
          className="bg-white/10 text-white border-white placeholder-white"
          onChange={(e) => handleInputChange("companyName", e.target.value)}
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.companyName.message}
          </p>
        )}
      </div>
    </div>
  );
};
