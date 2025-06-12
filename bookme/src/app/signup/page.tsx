"use client";

import { useState } from "react";
import Stepper, { Step } from "@/blocks/Components/Stepper/Stepper";
import { Step4 } from "./_components/Step4";
import { Step3 } from "./_components/Step3";
import { Step2 } from "./_components/Step2";
import { Step1 } from "./_components/Step1";

export interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  salonName: string;
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

const UPLOAD_PRESET= "bookMe"
const CLOUD_NAME = "dazhij9zy"

export default function SalonSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyImagePreview, setCompanyImagePreview] = useState<string[]>([]);
  const [companyImages, setCompanyImages] = useState<File[]>([]);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    salonName: "",
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
    const file = Array.from(e.target.files || [])
    if (file.length > 0) {
      setCompanyImages(prev => [...prev, ...file])
      const previews = file.map(file => URL.createObjectURL(file))
      setCompanyImagePreview(prev => [...prev, ...previews])
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
    <div className="bg-gradient-to-b from-indigo-900 via-blue-400 to-sky-200 min-h-screen">
      <Stepper
        initialStep={1}
        onStepChange={(step) => setCurrentStep(step)}
        onFinalStepCompleted={() => {
          console.log("Илгээсэн мэдээлэл:", formData);
          alert("Мэдээлэл амжилттай илгээгдлээ! Console-г шалгана уу.");
        }}
        backButtonText="Буцах"
        nextButtonText="Дараах"
      >
        <Step>
          <Step1 formData={formData} setFormData={setFormData} />
        </Step>

        <Step>
          <Step2 formData={formData} setFormData={setFormData} handleImageChange={handleImageChange} companyImagePreview={companyImagePreview}/>
        </Step>

        <Step>
          <Step3 formData={formData} setFormData={setFormData} dayLabels={dayLabels} />
        </Step>
        
        <Step>
<Step4 formData={formData} setFormData={setFormData} dayLabels={dayLabels} companyImagePreview={companyImagePreview}/>
        </Step>
      </Stepper>
    </div>
  );
}
