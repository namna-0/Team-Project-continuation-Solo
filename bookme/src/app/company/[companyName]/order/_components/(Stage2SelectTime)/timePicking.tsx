"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function CalendarTriggerScroll() {
    const [selected, setSelected] = useState<Date | undefined>();
    return (
        <div className="w-full max-w-sm mx-auto mt-10">
            <Popover open={!!selected} onOpenChange={(open) => !open && setSelected(undefined)}>
                <PopoverTrigger className="inline-flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                </PopoverTrigger>
                <PopoverContent className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg">
                    <div className="max-h-96 overflow-y-auto p-2">
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                            numberOfMonths={2} // Scroll хийх үед 2 сар харагдана
                            pagedNavigation={false} // Scroll маягаар олон сар шилжих боломж
                            captionLayout="dropdown" // Dropdown хэлбэртэй navigation
                            fromMonth={new Date()} // Өнөөдрөөс эхэлнэ
                            toMonth={new Date(new Date().getFullYear(), new Date().getMonth() + 6)} // 6 сар хүртэлх хугацааг харуулна
                            onMonthChange={(month) => {
                                setSelected(new Date(month.getFullYear(), month.getMonth(), 1));
                            }}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}


