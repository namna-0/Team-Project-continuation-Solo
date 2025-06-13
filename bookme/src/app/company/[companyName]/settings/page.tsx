"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { ImageSVG } from "./_components/assets/ImageSVG";
import { EmployeeSvg } from "./_components/assets/EmployeeSvg";
import axios from "axios";
import { AddEmployee } from "./_components/AddEmployee";

const companyProfileSchema = z.object({
  companyName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  webSite: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState("");
  const [openDays, setOpenDays] = useState({
    openingHours: {
      Monday: { open: "09:00", close: "18:00", closed: false },
      Tuesday: { open: "09:00", close: "18:00", closed: false },
      Wednesday: { open: "09:00", close: "18:00", closed: false },
      Thursday: { open: "09:00", close: "18:00", closed: false },
      Friday: { open: "09:00", close: "18:00", closed: false },
      Saturday: { open: "10:00", close: "18:00", closed: false },
      Sunday: { open: "10:00", close: "16:00", closed: false },
    },
  });

  const days = Object.keys(openDays.openingHours) as Array<
    keyof typeof openDays.openingHours
  >;

  const form = useForm<z.infer<typeof companyProfileSchema>>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: "",
      webSite: "",
      description: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const uploadedImageFunction = async (file: File | null) => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET_DATA!
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
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
    const files = e.target.files?.[0];
    if (files) {
      const result = await uploadedImageFunction(files);
      setUploadedImage(result);
    }
  };

  const handleCompanyData = () => {
    console.log("Hi");
  };

  function onSubmit(values: z.infer<typeof companyProfileSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#f7f7f7] p-4 gap-2">
      <AddEmployee />
      <div className="w-full border-b-2 pt-3 "></div>
      <div className="w-[1440px] p-4 flex gap-2">
        <Button>Profile</Button>
        <Button>Employee Management</Button>
      </div>
      <div className="w-[1440px] flex justify-between gap-2 ">
        <div className="flex flex-col w-[80%] gap-5">
          <div className="bg-white w-full rounded-2xl p-4 flex flex-col gap-4">
            <div>
              <div className="text-[20px] font-bold">Basic information</div>
              <div className="text-[14px] font-normal text-[#aaa]">
                Update your business details.
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="webSite"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel>Web site URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Web site URL" {...field} />
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
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Description here"
                          {...field}
                          className="w-full py-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Company phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="Write email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Company address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save changes</Button>
              </form>
            </Form>
          </div>
          <div className="bg-white w-full rounded-2xl p-4 flex flex-col gap-4">
            <div>
              <div className="text-[20px] font-bold">Working hours</div>
              <div className="text-[14px] font-normal text-[#aaa]">
                Set up your business operating hours
              </div>
            </div>

            {days.map((day, i) => {
              return (
                <div
                  className="text-[14px] font-semibold w-full flex justify-between items-center px-4"
                  key={i}
                >
                  <div>{day}</div>
                  <div className="flex gap-3 items-center w-fit">
                    <Input
                      type="time"
                      value={openDays.openingHours[day].open}
                      onChange={(e) =>
                        setOpenDays({
                          ...openDays,
                          openingHours: {
                            ...openDays.openingHours,
                            [day]: {
                              ...openDays.openingHours[day],
                              open: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={openDays.openingHours[day].closed}
                    />
                    <span>-</span>
                    <Input
                      type="time"
                      value={openDays.openingHours[day].close}
                      onChange={(e) =>
                        setOpenDays({
                          ...openDays,
                          openingHours: {
                            ...openDays.openingHours,
                            [day]: {
                              ...openDays.openingHours[day],
                              close: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={openDays.openingHours[day].closed}
                    />
                  </div>
                </div>
              );
            })}
            <Button className="w-fit">Update hours</Button>
          </div>
        </div>
        <div className="rounded-2xl w-[20%] h-fit flex flex-col gap-5">
          <div className="w-full h-full bg-white rounded-2xl p-4">
            <div className="text-[20px] font-bold">Business logo</div>
            <div className="w-full h-fit flex justify-center p-4">
              <div className="w-[100px] h-[100px] rounded-2xl flex flex-col items-center justify-center bg-[#e4e4e4] relative">
                {!uploadedImage && (
                  <>
                    <ImageSVG />
                    <div className="w-fit h-fit rounded-full absolute -right-2 -bottom-2">
                      <ImageSVG />
                    </div>

                    <Input
                      className="w-[30px] h-[30px] rounded-full absolute -right-2 -bottom-2 opacity-0"
                      type="file"
                      onChange={handleInputFile}
                    />
                  </>
                )}
                {uploadedImage && (
                  <img
                    src={`${uploadedImage}`}
                    alt="Company Logo Preview"
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
            <div className="w-full">
              <Button className="w-full" onClick={handleCompanyData}>
                Upload new logo
              </Button>
            </div>
          </div>
          <div className="w-full bg-white rounded-2xl p-4">
            <div className="text-[20px] font-bold">Business Stats</div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <EmployeeSvg /> Employees
                </div>
                <div>4</div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <EmployeeSvg /> Бусад мэдээлэл +
                </div>
                <div>?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
