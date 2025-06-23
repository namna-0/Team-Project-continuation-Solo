"use client"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { CompanyType } from "../../../page";
type DayPickerProps = {
    date: Date | null
    setDate: (date: Date | null) => void
    dayArrays: () => Date[]
    company: CompanyType

}
export default function WeekScroller({ date, setDate, dayArrays, company }: DayPickerProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollByWeek = (direction: string) => {
        if (!scrollContainerRef.current || dayRefs.current.length === 0) return;

        const scrollAmount = (dayRefs.current[0]?.offsetWidth ?? 0) * 7;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",

        });
    };

    useEffect(() => {
        const selectedIndex = dayArrays().findIndex(

            (d) =>
                date !== null && d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear()
        );

        if (selectedIndex !== -1 && dayRefs.current[selectedIndex]) {
            dayRefs.current[selectedIndex].scrollIntoView({
                behavior: "smooth",
                inline: "start",
                block: "nearest",
            });
        }
    }, [date]);

    const isDayFullyBookedOrClosed = (day: Date) => {
        const dayName = day.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
        const workingDay = company.workingHours[dayName];
        return workingDay?.closed === true || workingDay == null;
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="w-full border mt-2"></div>
            <div className="flex w-full justify-between h-fit">
                <div className="font-bold">
                    {date !== null
                        ? `${date.toLocaleString("mn-MN", { month: "short" })} ${date.getFullYear()}`
                        : new Date().toLocaleString("mn-MN", { year: "numeric", month: "short" })}
                </div>
                <div className="flex gap-3 items-center">
                    <ChevronLeftIcon
                        onClick={() => scrollByWeek("left")}
                        aria-label="Previous Week"
                        className="cursor-pointer"
                        size={18}
                    />
                    <ChevronRightIcon
                        onClick={() => scrollByWeek("right")}
                        aria-label="Next Week"
                        className="cursor-pointer"
                        size={18}
                    />
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                className="flex w-[790px] h-fit relative overflow-x-scroll scroll-smooth "
            >
                {dayArrays().map((day, index) => {
                    const isSelected =
                        date &&
                        date.getDate() === day.getDate() &&
                        date.getMonth() === day.getMonth() &&
                        date.getFullYear() === day.getFullYear();

                    const isDisabled = isDayFullyBookedOrClosed(day);

                    return (
                        <div
                            key={day.toString()}
                            ref={(el) => {
                                dayRefs.current[index] = el;
                            }}
                            onClick={() => {
                                setDate(day)
                                if (!isDisabled) {
                                    const selectedIndex = dayArrays().findIndex(
                                        (d) =>
                                            d.getDate() === day.getDate() &&
                                            d.getMonth() === day.getMonth() &&
                                            d.getFullYear() === day.getFullYear()
                                    );
                                    if (selectedIndex !== -1 && dayRefs.current[selectedIndex]) {
                                        dayRefs.current[selectedIndex].scrollIntoView({
                                            behavior: "smooth",
                                            inline: "start",
                                            block: "nearest",
                                        });
                                    }
                                }
                            }}
                            className="px-2 flex flex-col w-fit justify-center items-center gap-2 py-1"
                        >
                            <div
                                className={
                                    isSelected
                                        ? "rounded-full w-24 h-24 flex justify-center items-center font-bold text-2xl bg-indigo-700 text-white"
                                        : !isDisabled
                                            ? "flex justify-center items-center rounded-full text-2xl w-24 h-24 font-bold border border-gray-700 text-gray-400 bg-gray-100"
                                            : "flex justify-center items-center rounded-full text-2xl w-24 h-24 font-bold border border-gray-300"
                                }
                            >
                                {day.toLocaleDateString("default", { day: "numeric" })}
                            </div>
                            <div className="text-sm">
                                {day.toLocaleDateString("default", { weekday: "short" })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
