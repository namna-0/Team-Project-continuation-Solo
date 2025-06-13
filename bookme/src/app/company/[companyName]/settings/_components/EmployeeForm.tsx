"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ManSVG } from "./assets/ManSVG";
import { FormDataType } from "./AddEmployee";
import { useState } from "react";
import { api } from "@/axios";
import { toast } from "sonner";

const employeeSchema = z.object({
  profileImage: z.string().nonempty("Ажилтны зураг оруулна уу."),
  employeeName: z.string().nonempty("Ажилтны нэрийг оруулна уу."),
  description: z.string().nonempty("Ажилтны таницуулгаа оруулна уу."),
  duration: z.string().nonempty("Үйчилгээ үзүүлэх хугацааг оруулна уу."),
  workingHours: z.string().nonempty("Ажиллах хугацаа оруулна уу."),
  startTime: z.string().nonempty("Ажлын цаг сонгоно уу."),
  endTime: z.string().nonempty("Ажлын цаг сонгоно уу."),
  lunchTimeStart: z.string().nonempty("Цайны цагаа сонгоно уу."),
  lunchTimeEnd: z.string().nonempty("Цайны цагаа сонгоно уу."),
  availability: z.boolean(),
});

export const EmployeeForm = ({
  employeeData,
  setEmployeeData,
  setOpen,
}: FormDataType) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      profileImage: employeeData.profileImage,
      employeeName: employeeData.employeeName,
      description: employeeData.description,
      availability: employeeData.availability,
      duration: employeeData.duration,
      workingHours: employeeData.workingHours,
      startTime: employeeData.startTime,
      endTime: employeeData.endTime,
      lunchTimeStart: employeeData.lunchTimeStart,
      lunchTimeEnd: employeeData.lunchTimeEnd,
    },
  });
  const currentImage = form.watch("profileImage");
  console.log(currentImage);

  console.log(form.formState.errors);

  const uploadedImageFunction = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET_DATA!);

    try {
      const response = await api.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = response.data.url;

      return result;
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const handleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const [file] = e.target.files;

    if (file) {
      const result = await uploadedImageFunction(file);

      form.setValue("profileImage", result, {
        shouldValidate: true,
      });

      setEmployeeData((prev) => ({
        ...prev,
        profileImage: result,
      }));
    }
  };

  //   const signUp = async (username: string, email: string, password: string) => {
  //     setLoading(true);
  //     try {
  //       const { data } = await api.post(`/auth/sign-up`, {
  //         username,
  //         email,
  //         password,
  //       });

  //       localStorage.setItem("token", data.token);
  //       setUser(data.user);
  //       toast.success("User successfully created. Please Sign in");
  //       await router.push("/signIn");
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to sign in", error);
  //       toast.error("Failed to sign up.");
  //     }
  //   };
  const handleCreateEmployee = async (
    profileImage: string,
    employeeName: string,
    description: string,
    availability: boolean,
    duration: string,
    workingHours: string,
    startTime: string,
    endTime: string,
    lunchTimeStart: string,
    lunchTimeEnd: string
  ) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/employee`, {
        profileImage,
        employeeName,
        description,
        availability,
        duration,
        workingHours,
        startTime,
        endTime,
        lunchTimeStart,
        lunchTimeEnd,
      });
    } catch (error) {
      console.error("Ажилтан үүсгэхэд алдаа гарлаа", error);
      toast.error("Ажилтан үүсгэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };
  async function onSubmit(values: z.infer<typeof employeeSchema>) {
    await handleCreateEmployee(
      values.profileImage,
      values.employeeName,
      values.description,
      values.availability,
      values.duration,
      values.workingHours,
      values.startTime,
      values.endTime,
      values.lunchTimeStart,
      values.lunchTimeEnd
    );

    console.log("ADGADGA", values);

    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem className="w-full ">
              <div className="w-full flex justify-center">
                <div className=" flex flex-col  justify-center items-center gap-2 p-3  w-fit h-fit">
                  <div className=" flex w-fit h-fit relative  justify-center">
                    <div className="w-[100px] h-[100px]  rounded-full bg-gray-100 flex justify-center items-center overflow-hidden">
                      {!employeeData.profileImage && <ManSVG />}
                      {employeeData.profileImage && (
                        <div>
                          <img
                            src={field.value}
                            className="w-[100px] h-[100px]"
                          />
                        </div>
                      )}
                    </div>
                    {employeeData.profileImage && (
                      <div className="absolute -top-1 -right-1">
                        <Button
                          className=" text-white rounded-full w-[5px] opacity-80 "
                          variant={"outline"}
                          onClick={() =>
                            setEmployeeData((prev) => ({
                              ...prev,
                              profileImage: "",
                            }))
                          }
                        >
                          X
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className=" w-full h-fit flex">
                    <div className="relative flex">
                      <div className=" rounded-full px-3 bg-red-500">
                        Зураг оруулах
                      </div>

                      <FormControl className="absolute w-full h-full">
                        <Input
                          type="file"
                          name="profileImage"
                          className="w-full h-full opacity-0"
                          onChange={handleInputFile}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="employeeName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ажилтны нэр</FormLabel>
                <FormControl>
                  <Input placeholder="Ажилтны нэр оруулна уу." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ажилтны дэлгэрэнгүй мэдээлэл</FormLabel>
              <FormControl>
                <Input placeholder="Мэдээлэл" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ажил эхлэх</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ажил дуусах</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="w-fit" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="lunchTimeStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цайны цаг эхлэх</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lunchTimeEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цайны цаг дуусах</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Үйлчилгээний хугацаа</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ажиллах хугацаа</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
};
