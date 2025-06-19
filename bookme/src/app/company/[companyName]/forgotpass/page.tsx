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
const formSchema = z.object({
  email: z.string().email({
    message: "Нууц үг email хаяг шалгана уу.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/authuser/forgot-password", values);
      toast("Нууц үг сэргээх линк амжилттай илгээгдлээ.");
    } catch (error) {
      console.error(error);
      toast("Email илгээхэд алдаа гарлаа. Та дахин оролдоно уу.");
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
                Бүртгэлтэй Email хаягаа оруулж код сэргээнэ үү.
              </p>
            </div>
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
            <div className="flex justify-between w-[400px]">
              <p className="font-medium text-[14px] ">
                <span className="text-[14px] text-[#0f3dde] underline cursor-pointer">
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
