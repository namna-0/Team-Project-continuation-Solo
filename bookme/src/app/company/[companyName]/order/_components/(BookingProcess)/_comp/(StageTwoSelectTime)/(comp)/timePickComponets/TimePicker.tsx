"use client";
import { WeAreClosed } from "./ifClosed";
import { AvailabilityTimes } from "./availabilityTimes";
import { IsFullyDay } from "./iFIsFully";
import { TimePickerProps } from "../../../../(publicItems)/_OrderPageTypes/types";
function TimePicker({
    date,
    setDate,
    dayArrays,
    setSelectedTime,
    orders,
    availabilityTimes,
    selectedTime, isFully,
    isDayClosed,
    isSelectEmployee,
    setSelectedEmployee,
    setIsSelectEmployee,
    company, zurag,
    selectedEmployeeImf
}: TimePickerProps) {
    const isClosed = date ? isDayClosed(date) : false;
    const times = date ? availabilityTimes(date.getDay()) : [];
    const nextAvailabilityDay = () => {
        if (date) {
            const days = dayArrays(date); // бүх өдөр
            const currentIndex = days.findIndex(
                (d) =>
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()
            );
            for (let i = currentIndex + 1; i < days.length; i += 1) {
                const nextDay = days[i];
                if (!isDayClosed(nextDay)) {
                    setDate(nextDay);
                    console.log("Next available day:", nextDay);
                    break;
                }
            }
        }
    }
    if (isClosed) {
        return (
            <WeAreClosed nextAvailabilityDay={nextAvailabilityDay} isDayClosed={isDayClosed} date={date} setDate={setDate} dayArrays={dayArrays} />)
    }
    if (isFully) {
        return (
            <IsFullyDay nextAvailabilityDay={nextAvailabilityDay} isSelectEmployee={isSelectEmployee} setIsSelectEmployee={setIsSelectEmployee} setSelectedEmployee={setSelectedEmployee} company={company} setSelectedTime={setSelectedTime} zurag={zurag} selectedEmployeeImf={selectedEmployeeImf} />
        )
    }
    return (
        <AvailabilityTimes
            date={date} setDate={setDate} selectedTime={selectedTime} times={times} setSelectedTime={setSelectedTime} orders={orders} />
    );
}

export default TimePicker;
