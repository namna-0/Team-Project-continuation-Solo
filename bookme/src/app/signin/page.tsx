"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/axios";

// Зөвхөн signin-д тохирсон validation
const step1Schema = z.object({
  email: z.string().email("Зөв имэйл хаяг оруулна уу"),
  password: z.string().min(8, "Нууц үг дор хаяж 8 тэмдэгт байх ёстой"),
});

type Step1SchemaType = z.infer<typeof step1Schema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1SchemaType>({
    resolver: zodResolver(step1Schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Step1SchemaType) => {
    setLoading(true);
    try {
      const response = await api.post("/signin", data);
      if (response.status === 201) {
        toast.success("Амжилттай нэвтэрлээ");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-900 via-blue-400 to-sky-200 min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/10 p-8 rounded-xl text-white w-full max-w-md space-y-6 border border-white"
      >
        <h2 className="text-2xl font-bold text-center">Нэвтрэх</h2>

        <div>
          <Label htmlFor="email">Имэйл *</Label>
          <Input
            {...register("email")}
            placeholder="ta@example.com"
            className="bg-white/10 text-white border-white placeholder-white mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Нууц үг *</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="bg-white/10 text-white border-white placeholder-white mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#007FFF] hover:bg-[#339CFF] active:bg-[#005FCC] transition duration-200 py-2 rounded-lg font-semibold"
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </button>
      </form>
    </div>
  );
}
