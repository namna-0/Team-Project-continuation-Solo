"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCompanyAuth } from "../_providers/CompanyAuthProvider";
import Image from "next/image";
import Particles from "../_components/Particles";
import { motion } from "framer-motion";

const step1Schema = z.object({
  email: z.string().email("Зөв имэйл хаяг оруулна уу"),
  password: z.string().min(8, "Нууц үг дор хаяж 8 тэмдэгт байх ёстой"),
});

type Step1SchemaType = z.infer<typeof step1Schema>;

export default function SignIn() {
  const { signIn } = useCompanyAuth();
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
      await signIn(data.email, data.password);
      toast.success("Амжилттай нэвтэрлээ");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
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
  particleBaseSize={10}    
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
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/3 xl:w-1/4 flex items-center justify-center p-8 mx-auto"
        >
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
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
        </motion.div>
      </div>

    </div>
   
  );
}
