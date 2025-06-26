"use client";
import { useState } from "react";
import { OrderType } from "../../(publicItems)/orderImformation";
import { log } from "node:console";

type TimePickerProps = {
    date: Date | null;
    setDate: (date: Date | null) => void;
    availabilityTimes: (time: number) => number[];
    dayArrays: (date: Date) => Date[];
    setSelectedTime: (time: Date) => void;
    orders: OrderType[] | undefined;
    selectedTime: Date | null;
    isDayClosed: (day: Date) => boolean;

};

function TimePicker({
    date,
    setDate,
    dayArrays,
    setSelectedTime,
    orders,
    availabilityTimes,
    selectedTime,

    isDayClosed,
}: TimePickerProps) {
    const isClosed = date ? isDayClosed(date) : false;

    if (
        isClosed
    ) {
        return (<div className="flex w-full h-full justify-center items-center">
            <div className=" text-wrap text-black">өнөөдөр манай амралтын өдөр тул та бусад боломжит өдрүүдээс сонгон цагаа захиалан уу 😇 </div>
        </div>);
    }
    const times = date ? availabilityTimes(date.getDay()) : [];
    return (
        <div className="flex w-full flex-col gap-10 ">
            <div className="flex w-full gap-10 justify-end">
                <div className="flex justify-center items-center gap-2 "><div className=" rounded-full border p-2 border-gray-300"><div className="w-5  bg-gray-300 rounded-full h-5"></div></div><p>захиалгатай</p></div>
                <div className="flex justify-center items-center gap-2 "><div className=" rounded-full border p-2 border-blue-200/50"><div className="w-5  bg-blue-200/50 rounded-full h-5"></div></div><p>сул цаг</p></div>
                <div className="flex justify-center items-center gap-2 "><div className=" rounded-full border p-2 border-blue-500"><div className="w-5  bg-blue-500 rounded-full h-5"></div></div><p>таны сонгосон</p></div>
            </div>
            <div className="grid grid-cols-6 gap-5 items-center justify-center">

                {times.map((time, index) => {
                    const hour = Math.floor(time / 60);
                    const minute = time % 60;

                    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")}`;

                    const currentSlot = new Date(
                        date?.getFullYear() ?? 0,
                        date?.getMonth() ?? 0,
                        date?.getDate() ?? 0,
                        hour,
                        minute
                    );
                    const allSelectedTimes = orders
                        ? orders.map((order: OrderType) => new Date(order.selectedTime))
                        : []

                    const isBooked =
                        allSelectedTimes.some(
                            (selectedTime) => selectedTime.getTime() === currentSlot.getTime()
                        ) || currentSlot.getTime() < new Date().getTime();

                    const isSelected =
                        selectedTime &&
                        selectedTime.getTime() === currentSlot.getTime();

                    const className = isBooked
                        ? "bg-gray-300 flex w-full rounded-xl items-center p-4 text-gray-500 cursor-not-allowed pointer-events-none"
                        : isSelected
                            ? "bg-blue-500 flex w-full  rounded-xl items-center justify-center p-4 cursor-pointer text-white"
                            : "bg-blue-200/50  flex w-full rounded-xl items-center justify-center p-4 hover:border hover:border-gray-500 cursor-pointer";

                    return (
                        <div className="">
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
                        </div>
                    );
                })}
            </div>
        </div >
    );
}

export default TimePicker;
