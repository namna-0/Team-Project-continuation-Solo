"use client";

import { useState } from "react";
import Stepper, { Step } from "@/blocks/Components/Stepper/Stepper";
import { Step4 } from "./_components/Step4";
import { Step3 } from "./_components/Step3";
import { Step2 } from "./_components/Step2";
import { Step1 } from "./_components/Step1";
import axios from "axios";
import { api } from "@/axios";

export interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  logo: string;
  openingHours: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };
}

interface DaySchedule {
  open: string;
  close: string;
  closed: boolean;
}

const UPLOAD_PRESET = "bookMe";
const CLOUD_NAME = "dazhij9zy";

export default function SalonSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyImagePreview, setCompanyImagePreview] = useState<string[]>([]);
  const [companyImages, setCompanyImages] = useState<File[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    logo: "",
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setCompanyImages((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setCompanyImagePreview((prev) => [...prev, ...previews]);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const preview = URL.createObjectURL(file);
      setLogoPreview(preview);
      setFormData((prev) => ({ ...prev, logo: preview }));
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      let logoUrl = "";
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }
      const imageUrls = await Promise.all(
        companyImages.map((file) => uploadToCloudinary(file))
      );

      const apiData = {
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        address: formData.address,
        companyLogo: logoUrl,
        phoneNumber: formData.phone,
        description: formData.description,
        companyImages: imageUrls,
        employees: [],
        workingHours: formData.openingHours,
        lunchBreak: null,
      };

      const response = await api.post("/signup", apiData);

      if (response.status === 201) {
        alert("Салоны мэдээлэл амжилттай бүртгэгдлээ!");
        console.log("Response:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const dayLabels: Record<string, string> = {
    monday: "Даваа",
    tuesday: "Мягмар",
    wednesday: "Лхагва",
    thursday: "Пүрэв",
    friday: "Баасан",
    saturday: "Бямба",
    sunday: "Ням",
  };

  return (
    <div className="bg-gradient-to-b from-indigo-900 via-blue-400 to-sky-200 min-h-screen h-fit">
      <Stepper
        initialStep={1}
        onStepChange={(step) => setCurrentStep(step)}
        onFinalStepCompleted={handleFinalSubmit}
        backButtonText="Буцах"
        nextButtonText={isSubmitting ? "Илгээж байна..." : "Дараах"}
        disabled={isSubmitting}
      >
        <Step>
          <Step1 formData={formData} setFormData={setFormData} />
        </Step>

        <Step>
          <Step2
            formData={formData}
            setFormData={setFormData}
            handleImageChange={handleImageChange}
            companyImagePreview={companyImagePreview}
            handleLogoChange={handleLogoChange}
            logoPreview={logoPreview}
          />
        </Step>

        <Step>
          <Step3
            formData={formData}
            setFormData={setFormData}
            dayLabels={dayLabels}
          />
        </Step>

        <Step>
          <Step4
            formData={formData}
            setFormData={setFormData}
            dayLabels={dayLabels}
            companyImagePreview={companyImagePreview}
            logoPreview={logoPreview}
          />
        </Step>
      </Stepper>
    </div>
  );
}
