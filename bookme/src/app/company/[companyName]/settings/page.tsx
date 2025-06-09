"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

const companyTimeSchedule = z.object({
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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Home() {
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

  function onSubmit(values: z.infer<typeof companyProfileSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#f7f7f7] p-4">
      <div className="w-[1440px] bg-white rounded-2xl">
        <div className="flex justify-between items-center p-4">
          <div>
            <div className="text-[20px] font-medium">
              Organization Management
            </div>
            <div className="text-[14px] font-normal text-gray-400">
              Manage your business profile and team
            </div>
          </div>
          <Button>+ Add employee</Button>
        </div>
      </div>
      <div className="w-full border-b-2 pt-3 "></div>
      <div className="w-[1440px] p-4 flex gap-2">
        <Button variant={"outline"}>Profile</Button>
        <Button variant={"outline"}>Employee Management</Button>
      </div>
      <div className="w-[1440px] flex justify-between gap-2">
        <div className="bg-white rounded-2xl p-4 w-[80%] flex flex-col gap-4">
          <div>
            <div className="text-[24px] font-semibold">Basic information</div>
            <div className="text-[14px] font-normal text-[#aaa]">
              Update your business details.
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="bg-white rounded-2xl p-4 w-[20%]">Right</div>
      </div>
    </div>
  );
}
