"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const CompanyWorkingHours = () => {
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
      <div className="w-full flex justify-end">
        <Button className="w-fit">Update hours</Button>
      </div>
    </div>
  );
};
