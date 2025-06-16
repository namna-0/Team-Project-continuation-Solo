import { api, setAuthToken } from "@/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PropsWithChildren } from "react";

export type Company = {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
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
};

interface DaySchedule {
  open: string;
  close: string;
  closed: boolean;
}

type AuthContextType = {
  company?: Company;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (company: Company) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const CompanyAuthProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState<Company | undefined>();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/signin`, { email, password });
      localStorage.setItem("token", data.token);
      setCompany(data.company);
      return data.company;
    } catch (error) {
      toast.error("Нэвтрэхэд алдаа гарлаа");
      return undefined;
    }
  };

  const signUp = async (company: Company) => {
    try {
      const response = await api.post(`/signup`, company);
      const { data, status } = response;

      localStorage.setItem("token", data.token);
      setCompany(data.company);
      if (status === 200 || status === 201) {
        toast.success("Амжилттай бүртгэгдлээ!", { position: "top-center" });
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Имэйл хаяг бүртгэлтэй байна", { position: "top-center" });
      } else {
        toast.error("Бүртгүүлэхэд алдаа гарлаа", { position: "top-center" });
      }
      console.error("Signup error", error);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setCompany(undefined);
  };

  const getCompany = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setAuthToken(token);
    try {
      const { data } = await api.get(`/company/me`);
      setCompany(data);
    } catch (error) {
      console.error("Компанийн мэдээлэл авахад алдаа гарлаа", error);
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
