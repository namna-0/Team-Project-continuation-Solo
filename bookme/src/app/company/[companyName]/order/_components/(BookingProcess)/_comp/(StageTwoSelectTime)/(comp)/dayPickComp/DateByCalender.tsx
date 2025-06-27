"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormatLongFnOptions, isToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CalendarProps } from "../../../../../(publicItems)/_OrderPageTypes/types";
function SelectDayOnCalendar({ open, setOpen, setDate, date }: CalendarProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <CalendarIcon size={30} />
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-2 z-10 flex  bg-white "
        align="center"
      >
        <Calendar
          className="flex gap-3"
          required={true}
          locale={{
            code: "mn",
            formatLong: {
              date: () => new Date().toLocaleDateString("mn-MN"),
              time: function (options: FormatLongFnOptions): string {
                throw new Error("Function not implemented.");
              },
              dateTime: function (options: FormatLongFnOptions): string {
                throw new Error("Function not implemented.");
              },
            },
          }}
          mode="single"
          selected={date ?? null}
          buttonVariant="ghost"
          captionLayout="dropdown"
          fromYear={new Date().getFullYear()} // өнөөдрийн оноос эхэлнэ
          toYear={new Date().getFullYear() + 1} // дараа жилийн эхний сар хүртэл
          onMonthChange={(month) => {
            const today = new Date();
            const isCurrentMonth =
              month.getFullYear() === today.getFullYear() &&
              month.getMonth() === today.getMonth();
            const newDate = isCurrentMonth
              ? today
              : new Date(month.getFullYear(), month.getMonth(), 1);
            setDate(newDate);
          }}
          fromMonth={new Date(new Date().getFullYear(), new Date().getMonth())} // өнөөдрийн сар
          toMonth={
            new Date(new Date().getFullYear(), new Date().getMonth() + 3)
          }
          modifiers={{ today: (date) => isToday(date) }}
          disabled={{ before: new Date() }}
          onSelect={(date) => {
            setDate(date ? date : new Date());
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
export default SelectDayOnCalendar;
