"use client";
import { useState } from "react";
import { OrderType } from "../../(publicItems)/orderImformation";

type TimePickerProps = {
    date: Date | null;
    setDate: (date: Date | null) => void;
    availabilityTimes: (time: number) => number[];
    dayArrays: (date: Date) => Date[];
    setSelectedTime: (time: Date) => void;
    orders: OrderType[] | undefined;
    selectedTime: Date | null;
    isDayClosed: (day: Date) => boolean;
    isDayFullyBooked: (day: Date) => boolean;
};

function TimePicker({
    date,
    setDate,
    dayArrays,
    setSelectedTime,
    orders,
    availabilityTimes,
    selectedTime,
    isDayFullyBooked,
    isDayClosed,
}: TimePickerProps) {
    const isFullyBooked = date ? isDayFullyBooked(date) : false;
    const isClosed = date ? isDayClosed(date) : false;

    if (
    
        isClosed

    ) {
        return (<div className="flex w-full h-full justify-center items-center">
            <div className=" text-wrap text-black">өнөөдөр манай амралтын өдөр тул та бусад боломжит өдрүүдээс сонгон цагаа захиалан уу 😇 </div>
        </div>);
    }
    if (!date ||
        !dayArrays(date).some((day) => day.getDate() === date.getDate())
        || isFullyBooked) {
        return (<div> энэ өдрийн боломжит цагууд бүгд захиалагдсан байна. Та бусад боломжит өдрүүдээс сонгон цагаа захиалан уу</div>)
    }

    const times = availabilityTimes(date.getDay());
    return (
        <div className="grid grid-cols-6 gap-5 items-center justify-center">
            {times.map((time, index) => {
                const hour = Math.floor(time / 60);
                const minute = time % 60;

                const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;

                const currentSlot = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    hour,
                    minute
                );

                const allSelectedTimes = orders
                    ? orders.map((order: OrderType) => new Date(order.selectedTime))
                    : [];

                const isBooked =
                    allSelectedTimes.some(
                        (selectedTime) => selectedTime.getTime() === currentSlot.getTime()
                    ) || currentSlot.getTime() < new Date().getTime();

                const isSelected =
                    selectedTime &&
                    selectedTime.getTime() === currentSlot.getTime();

                const className = isBooked
                    ? "bg-gray-600 flex w-full items-center p-4 text-gray-500 cursor-not-allowed pointer-events-none"
                    : isSelected
                        ? "bg-blue-500 flex w-full items-center justify-center p-4 cursor-pointer text-white"
                        : "bg-gray-300 flex w-full items-center justify-center p-4 hover:bg-gray-400 cursor-pointer";

                return (
                    <span
                        key={index}
                        className={className}
                        onClick={() => {
                            if (!isBooked) {
                                setDate(currentSlot);
                                setSelectedTime(currentSlot);
                            }
                        }}
                    >
                        {formattedTime}
                    </span>
                );
            })}
        </div>
    );
}

export default TimePicker;
