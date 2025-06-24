"use client";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { api } from "@/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { WorkingHoursType } from "../../_components/CompanyTypes";
import { LoadingSvg } from "@/app/_components/assets/LoadingSvg";

const dayLabels: Record<keyof WorkingHoursType, string> = {
  monday: "Даваа",
  tuesday: "Мягмар",
  wednesday: "Лхагва",
  thursday: "Пүрэв",
  friday: "Баасан",
  saturday: "Бямба",
  sunday: "Ням",
};

export const CompanyWorkingHours = () => {
  const { company } = useCompanyAuth();
  const [loading, setLoading] = useState(false);
  if (!company) return <LoadingSvg />;
  const [changedTimeSchedule, setChangedTimeSchedule] = useState(
    company?.workingHours
  );

  return (
    <div className="w-full h-fit rounded-2xl p-3 bg-white">
      <div>
        <div className="text-[20px] font-bold">Ажлын цаг</div>
        <div className="text-[14px] font-normal text-[#aaa]">
          Ажлын өдрийн төлөв өөрчлөх хэсэг.
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        {changedTimeSchedule &&
          Object.entries(changedTimeSchedule)
            .filter(([key]) => key !== "_id")
            .map(([day, data]) => (
              <div
                key={day}
                className="w-fit flex flex-col gap-3 items-center p-3 border-2 rounded-2xl bg-gray-50"
              >
                <div className="w-full flex justify-center ">
                  <div className="w-fit bg-gray-300 rounded-3xl px-3">
                    {dayLabels[day as keyof WorkingHoursType]}
                  </div>
                </div>
                <div className="w-fit flex gap-3 ">
                  <Input
                    type="time"
                    value={data.open}
                    onChange={(e) =>
                      setChangedTimeSchedule((prev) => ({
                        ...prev!,
                        [day]: {
                          ...prev?.[day as keyof WorkingHoursType],
                          open: e.target.value,
                        },
                      }))
                    }
                  />
                  <Input
                    type="time"
                    value={data.close}
                    onChange={(e) =>
                      setChangedTimeSchedule((prev) => ({
                        ...prev!,
                        [day]: {
                          ...prev?.[day as keyof WorkingHoursType],
                          close: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={async () => {
                    const updatedClosed = !data.closed;
                    setChangedTimeSchedule((prev) => ({
                      ...prev!,
                      [day]: {
                        ...prev?.[day as keyof WorkingHoursType],
                        closed: updatedClosed,
                      },
                    }));
                    try {
                      await api.put(`company/${company._id}`, {
                        workingHours: {
                          ...changedTimeSchedule,
                          [day]: {
                            ...changedTimeSchedule?.[
                              day as keyof WorkingHoursType
                            ],
                            closed: updatedClosed,
                          },
                        },
                      });
                      toast.success(
                        `${
                          dayLabels[day as keyof WorkingHoursType]
                        } амжилттай шинэчлэгдлээ`
                      );
                    } catch (error) {
                      console.error("Хүсэлт илгээхэд алдаа:", error);
                      toast.error("Сервертэй холбогдоход алдаа гарлаа.");
                    }
                  }}
                >
                  {data.closed ? "Нээх" : "Хаах"}
                </Button>
              </div>
            ))}
      </div>
    </div>
  );
};
