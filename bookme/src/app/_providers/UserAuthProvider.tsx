"use client";
import { api, setAuthToken } from "@/axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  phoneNumber: string;
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);
export const UserAuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/authuser/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/");
      return data.user;
    } catch (error) {
      toast.error("Нэвтрэхэд алдаа гарлаа.");
      return undefined;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data } = await api.post(`/authuser/signup`, {
        email,
        password,
        username,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      toast.error("Бүртгүүлэхэд алдаа гарлаа.");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  const getUser = async () => {
    try {
      const { data } = await api.get(`/authuser/me`);
      setUser(data);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      setUser(undefined);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
