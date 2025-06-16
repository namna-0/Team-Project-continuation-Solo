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
import { HeaderSection } from "./_components/HeaderSection";
import { UploadCompanyLogo } from "./_components/UploadCompanyLogo";
import { CompanyBasicInformation } from "./_components/CompanyBasicInformation";

export default function Home() {
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

  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#f7f7f7] p-4 gap-2">
      <HeaderSection />
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

            <CompanyBasicInformation />
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
        <UploadCompanyLogo />
      </div>
    </div>
  );
}
