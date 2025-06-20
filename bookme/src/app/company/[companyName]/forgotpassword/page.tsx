"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { api } from "@/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Нууц үг email хаяг шалгана уу.",
  }),
});

const verifySchema = z.object({
  code: z.string().min(4, "4 оронтой код оруулна уу."),
  newPassword: z
    .string()
    .min(4, "Шинэ нууц үг хамгийн багадаа 4 тэмдэгт байх ёстой."),
});
export default function Home() {
  const [step, setStep] = useState<"email" | "verify">("email");
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "", newPassword: "" },
  });
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1 && interval) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldown]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/authuser/forgot-password", values);
      toast.success("Нууц үг сэргээх код амжилттай илгээгдлээ.");
      setEmail(values.email);
      setStep("verify");
      setCooldown(60);
    } catch (error) {
      console.error(error);
      toast.error("Email илгээхэд алдаа гарлаа. Та дахин оролдоно уу.");
    }
  }
  async function handleVerify(values: z.infer<typeof verifySchema>) {
    try {
      await api.post("/authuser/verify-resetcode", {
        email,
        ...values,
      });
      toast.success("Нууц үг амжилттай шинэчлэгдлээ.");
      setStep("email");
      verifyForm.reset();
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Код буруу эсвэл хугацаа нь дууссан байна.");
    }
  }
  async function resendCode() {
    if (cooldown > 0) return;
    try {
      await api.post("/authuser/forgot-password", { email });
      toast.success("Код дахин илгээгдлээ.");
      setCooldown(60);
    } catch (error) {
      toast.error("Код дахин илгээхэд алдаа гарлаа.");
    }
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-radial-[at_50%_75%] from-indigo-900 via-blue-400 to-sky-200 to-90% text-white">
      <div className="w-[1440px] h-fit flex  rounded-[23px] justify-center items-center shadow-xl ">
        <div className="w-[50%] h-full flex justify-center items-center ">
          <div className="w-[404px] h-[638px] flex flex-col gap-[10px] ">
            <div className="w-fit h-[53px] flex flex-col mb-[30px]">
              <p className="font-medium text-[32px] ">Нууц үгээ мартсан уу?</p>
              <p className="font-medium text-[16px]">
                {step === "email"
                  ? "Бүртгэлтэй Email хаягаа оруулж код сэргээнэ үү."
                  : `${email} хаяг руу илгээгдсэн 4 оронтой код болон шинэ нууц үгээ оруулна уу.`}
              </p>
            </div>
            {step === "email" ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-[32px] h-fit"
                >
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

                  <Button
                    type="submit"
                    className="h-8 bg-[#007fff] text-[13px] font-bold text-white rounded-[10px] cursor-pointer"
                  >
                    Илгээх
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...verifyForm}>
                <form
                  onSubmit={verifyForm.handleSubmit(handleVerify)}
                  className="flex flex-col gap-[24px]"
                >
                  <FormField
                    control={verifyForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>4 оронтой код</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Код"
                            className="border border-gray-200"
                            value={field.value}
                            onChange={(e) => {
                              console.log("Input changed:", e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={verifyForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Шинэ нууц үг</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Шинэ нууц үг"
                            className="border border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between items-center">
                    <Button type="submit" className="bg-green-600">
                      Илгээх
                    </Button>
                    <Button
                      type="button"
                      onClick={resendCode}
                      disabled={cooldown > 0}
                    >
                      {cooldown > 0 ? `${cooldown} сек` : "Код дахин илгээх"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            <div className="flex justify-between w-[400px]">
              <p className="font-medium text-[14px] ">
                <span
                  className="text-[14px] text-[#0f3dde] underline cursor-pointer"
                  onClick={() => {
                    setStep("email");
                    verifyForm.reset();
                  }}
                >
                  Буцах
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full ">
          <img src="/rectanglelogin.png" className="w-full h-full"></img>
        </div>
      </div>
    </div>
  );
}
