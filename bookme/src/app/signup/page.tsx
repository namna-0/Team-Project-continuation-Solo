"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import Image from "next/image";
import Particles from "../_components/Particles";

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
    backGroundImage: "",
    experience: "",
    clientNumber: "",
  };

  const methods = useForm<FullSchemaType>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    return () => {
      companyImagePreview.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      if (logoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [companyImagePreview, logoPreview]);

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
      // Clean up previous preview
      if (logoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }

      setLogoFile(file);
      const preview = URL.createObjectURL(file);
      setLogoPreview(preview);
      methods.setValue("logo", preview);
    }
  };

  function capitalizeWords(input: string): string {
    return input
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          timeout: 30000,
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("Image upload failed");
    }
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
        companyName: capitalizeWords(values.companyName),
        address: values.address,
        city: values.city,
        lat: values.lat,
        lng: values.lng,
        companyLogo: logoUrl,
        phoneNumber: values.phone,
        description: values.description ?? "",
        companyImages: imageUrls,
        employees: [],
        bookings: [],
        workingHours: values.openingHours,
        lunchBreak: values.lunchBreak,
        aboutUsImage: values.aboutUsImage,
        backGroundImage: values.backGroundImage,
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
    // Clean up the object URL
    const urlToRevoke = companyImagePreview[index];
    if (urlToRevoke?.startsWith("blob:")) {
      URL.revokeObjectURL(urlToRevoke);
    }

    setCompanyImagePreview((prev) => prev.filter((_, i) => i !== index));
    setCompanyImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeLogo = () => {
    // Clean up the object URL
    if (logoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative"
        >
          <div className="w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-r border-white/10 flex flex-col justify-center items-center p-12">
            <div className="text-center space-y-8 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-white mb-4">
                  Компани бүртгэх
                </h1>
                          <Particles
            className="absolute inset-0 z-10"
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={2000}
  particleSpread={20}
  cameraDistance={100}
  particleBaseSize={10}    // том болгох эсвэл жижигрүүлэх боломжтой
  sizeRandomness={0.5}
  speed={0.05}
          />
                <Image
                  width={500}
                  height={500}
                  src="https://res.cloudinary.com/dpbmpprw5/image/upload/q_auto,f_auto/v1750157865/earth_Large_rwbjag.png"
                  alt="Earth"
                  priority
                  className="object-contain opacity-100 pointer-events-none rotating-earth"
                  style={{
                    filter: "drop-shadow(0 0 50px rgba(59, 130, 246, 0.8))",
                  }}
                  quality={80}
                  unoptimized={false}
                />
                <p className="text-slate-300 text-lg leading-relaxed">
                  Таны бизнесийг цахим орчинд нэвтрүүлж, илүү олон
                  үйлчлүүлэгчдэд хүрэх боломжийг олгоно
                </p>
              </motion.div>


              <div className="relative">
                <motion.div
                  className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-white-400 rounded-2xl rotate-12 opacity-20"
                  animate={{
                    rotate: [12, 18, 12],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute top-8 left-8 w-8 h-10 bg-gradient-to-r from-blue-400 to-white-400 rounded-xl -rotate-12 opacity-30"
                  animate={{
                    rotate: [-12, -18, -12],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center justify-center space-x-4 text-slate-400"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm">Алхам {currentStep} / 6</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
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
                  <div className="max-h-[70vh] overflow-auto px-2">
                    <Step4
                      formData={{
                        ...methods.getValues(),
                        description: methods.getValues().description ?? "",
                        backGroundImage:
                          methods.getValues().backGroundImage ?? "",
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
                  </div>
                </Step>
                <Step>
                  <Step5
                    formData={methods.getValues()}
                    setFormData={() => {}}
                  />
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
          </div>
        </motion.div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center gap-6 border border-white/30"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-600 rounded-full animate-spin animation-delay-75" />
            </div>
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-2">Илгээж байна...</h3>
              <p className="text-slate-300">
                Компаний мэдээлэл боловсруулж байна
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
