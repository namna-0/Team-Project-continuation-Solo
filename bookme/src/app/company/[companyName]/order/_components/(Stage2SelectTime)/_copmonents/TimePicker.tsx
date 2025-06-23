"use client";

import { OrderType } from "../../(publicItems)/orderImformation";

type TimePickerProps = {
    date: Date | null;
    setDate: (date: Date | null) => void;
    availabilityTimes: (time: number) => number[];
    dayArrays: (date: Date) => Date[];
    setSelectedTime: (time: Date) => void;
    orders: OrderType[] | undefined;
};

function TimePicker({
    date,
    setDate,
    dayArrays,
    setSelectedTime,
    orders,
    availabilityTimes,
}: TimePickerProps) {
    return (
        date &&
        dayArrays(date).some((day: Date) => day.getDate() === date.getDate()) && (
            <div className="grid grid-cols-6 gap-5 items-center justify-center">
                {(availabilityTimes(date?.getDate() ?? 0) || []).map((time, index) => {
                    const hour = Math.floor(Number(time) / 60);
                    const minute = time % 60;
                    const formattedTime = `${hour
                        .toString()
                        .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                    const currentSlot = new Date(
                        date?.getFullYear() ?? new Date().getFullYear(),
                        date?.getMonth() ?? new Date().getMonth(),
                        date?.getDate() ?? new Date().getDate(),
                        hour,
                        minute
                    );
                    const allSelectedTimes = orders
                        ? orders.map((order: OrderType) => new Date(order.selectedTime))
                        : [];
                    const isBooked = allSelectedTimes.some((selectedTime) => selectedTime.getTime() === currentSlot.getTime()) || currentSlot.getTime() < new Date().getTime();
                    return (
                        <span
                            key={index}
                            className={
                                isBooked && new Date()
                                    ? "bg-gray-600 flex w-full items-center p-4 text-gray-500 cursor-not-allowed pointer-events-none"
                                    : "bg-gray-200 flex w-full items-center justify-center p-4 line-through hover:bg-gray-300 cursor-pointer"
                            }
                            onClick={() => {
                                if (date && !isBooked) {
                                    const newDate = new Date(
                                        date.getFullYear(),
                                        date.getMonth(),
                                        date.getDate(),
                                        hour,
                                        minute
                                    );
                                    setDate(newDate);
                                    setSelectedTime(newDate);
                                }
                            }}
                        >
                            {formattedTime}
                        </span>
                    );
                })}
            </div>
        )
    );
}

export default TimePicker;
