"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/_providers/UserAuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(3, {
      message: "Please Enter your password",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function Home() {
  const { signUp, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, email, password } = values;
    setLoading(true);
    try {
      await signUp(email, password, username);
      form.reset();
    } catch (error) {
      toast.error("Бүртгүүлэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-radial-[at_50%_75%] from-indigo-900 via-blue-400 to-sky-200 to-90% text-white">
      <div className="w-[1440px] h-fit flex  rounded-[23px] justify-center items-center shadow-xl ">
        <div className="w-[50%] h-full flex justify-center items-center ">
          <div className="w-[404px] h-[638px] flex flex-col gap-[10px] ">
            <div className="w-fit h-[53px]">
              <p className="font-medium text-[32px] ">Бүртгүүлэх</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-[32px] h-fit"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хэрэглэгчийн нэр</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Хэрэглэгчийн нэр оруулна уу."
                          className="border border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email хаяг</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email хаяг оруулна уу."
                          className="border border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Нууц үг </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Нууц үг оруулна уу."
                          className="border border-gray-200"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Нууц үг давтах</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Нууц үг давтан оруулна уу."
                          className="border border-gray-200"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="h-8 bg-[#007fff] text-[13px] font-bold text-white rounded-[10px] cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
                </Button>
              </form>
            </Form>

            <p className="font-medium text-[14px] ">
              Бүртгэлтэй юу?{" "}
              <span className="text-[14px] text-[#0f3dde] underline cursor-pointer">
                Нэвтрэх
              </span>
            </p>
          </div>
        </div>
        <div className="w-[50%] h-full ">
          <img src="/rectanglelogin.png" className="w-full h-full"></img>
        </div>
      </div>
    </div>
  );
}
