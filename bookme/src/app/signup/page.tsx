"use client";

import { useState, useEffect } from "react";
import Stepper, { Step } from "@/blocks/Components/Stepper/Stepper";
import { Step6 } from "./_components/Step6";
import { Step3 } from "./_components/Step3";
import { Step1 } from "./_components/Step1";
import axios from "axios";
import { FormDataType } from "./_components/Types";
import { useCompanyAuth } from "../_providers/CompanyAuthProvider";
import { toast } from "sonner";
import { Step5 } from "./_components/Step5";
import { Step2 } from "./_components/Step2";
import { Step4 } from "./_components/Step4";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullSchema, FullSchemaType } from "./_components/Schemas";

const UPLOAD_PRESET = "bookMe";
const CLOUD_NAME = "dazhij9zy";

export default function CompanySetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyImagePreview, setCompanyImagePreview] = useState<string[]>([]);
  const [companyImages, setCompanyImages] = useState<File[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useCompanyAuth();

  const formData: FormDataType = {
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
    lunchBreak: {
      start: "12:00",
      end: "13:00",
    },
    aboutUsImage: "",
    backgroundImage: "",
    experience: "",
    clientNumber: "",
  };

  const methods = useForm<FullSchemaType>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: formData,
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
      methods.setValue("logo", preview);
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
      const values = methods.getValues();

      let logoUrl = "";
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }
      const imageUrls = await Promise.all(
        companyImages.map((file) => uploadToCloudinary(file))
      );

      const apiData = {
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        address: values.address,
        city: values.city,
        lat: values.lat,
        lng: values.lng,
        companyLogo: logoUrl,
        phoneNumber: values.phone,
        description: values.description ?? "",
        companyImages: imageUrls,
        employees: [],
        workingHours: values.openingHours,
        lunchBreak: values.lunchBreak,
        aboutUsImage: values.aboutUsImage,
        backgroundImage: values.backgroundImage,
        clientNumber: values.clientNumber,
        experience: values.experience,
      };

      console.log("Илгээж буй өгөгдөл:", apiData);

      const response = await signUp(apiData);
      if (response) {
        toast.success("Таны компани амжилттай бүртгэгдлээ!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCompanyImage = (index: number) => {
    const newPreviews = [...companyImagePreview];
    newPreviews.splice(index, 1);
    setCompanyImagePreview(newPreviews);

    const newFiles = [...companyImages];
    newFiles.splice(index, 1);
    setCompanyImages(newFiles);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    methods.setValue("logo", "");
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
    <div className="bg-gradient-to-b from-indigo-900 via-blue-400 to-sky-200 min-h-screen h-fit relative flex items-center">
      <FormProvider {...methods}>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            setCurrentStep(step);
          }}
          onFinalStepCompleted={handleFinalSubmit}
          backButtonText="Буцах"
          nextButtonText={isSubmitting ? "Илгээж байна..." : "Дараах"}
          disabled={isSubmitting}
        >
          <Step>
            <Step1 />
          </Step>
          <Step>
            <Step2 />
          </Step>
          <Step>
            <Step3 dayLabels={dayLabels} />
          </Step>
          <Step>
            <Step4
              formData={{
                ...methods.getValues(),
                description: methods.getValues().description ?? "",
                backgroundImage: methods.getValues().backgroundImage ?? "",
                aboutUsImage: methods.getValues().aboutUsImage ?? "",
              }}
              setFormData={() => {}}
              handleImageChange={handleImageChange}
              companyImagePreview={companyImagePreview}
              removeCompanyImage={removeCompanyImage}
              handleLogoChange={handleLogoChange}
              logoPreview={logoPreview}
              removeLogo={removeLogo}
            />
          </Step>
          <Step>
            <Step5 formData={methods.getValues()} setFormData={() => {}} />
          </Step>
          <Step>
            <Step6
              formData={methods.getValues()}
              setFormData={() => {}}
              dayLabels={dayLabels}
              companyImagePreview={companyImagePreview}
              logoPreview={logoPreview}
            />
          </Step>
        </Stepper>
      </FormProvider>

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center flex flex-col items-center gap-2">
            <svg
              className="animate-spin h-6 w-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              Компаний мэдээлэл илгээж байна...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
