"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PropsWithChildren } from "react";
import { api, setAuthToken } from "@/axios";

export type Company = {
  _id?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  companyName: string;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
  city: string;
  phoneNumber: string;
  companyLogo: string;
  companyImages: string[];
  workingHours?: any;
  lunchBreak?: string;
};

type AuthContextType = {
  company?: Company;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (company: Company) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const CompanyAuthProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState<Company | undefined>();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      console.log("hi");

      const { data } = await api.post("/signin", { email, password });
      localStorage.setItem("company_token", data.token);
      setCompany(data.company);
      router.push(`/company/${data.company.companyName}`);
      toast.success("Амжилттай нэвтэрлээ!");
    } catch (error) {
      toast.error("Нэвтрэхэд алдаа гарлаа");
    }
  };

  const signUp = async (newCompany: Company) => {
    try {
      const { data } = await api.post("/signup", newCompany);
      localStorage.setItem("company_token", data.token);
      setCompany(data.company);
      toast.success("Амжилттай бүртгэгдлээ!");
      router.push(`/company/${data.company.companyName}`);
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Имэйл бүртгэлтэй байна");
      } else {
        toast.error("Бүртгэл амжилтгүй боллоо");
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem("company_token");
    setCompany(undefined);
    toast("Системээс гарлаа");
  };

  const getCompany = async () => {
    const token = localStorage.getItem("company_token");
    if (!token) return;
    setAuthToken(token);
    try {
      const { data } = await api.get("/company/me");
      setCompany(data);
    } catch (error) {
      console.error("Компаний мэдээлэл авахад алдаа:", error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <AuthContext.Provider value={{ company, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useCompanyAuth = () => useContext(AuthContext);
