"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import UpdateEmployee from "../../(Stage1EmployeeSelect)/updateEmployeeDialog";
import { CompanyType } from "../../../page";
import { useState } from "react";
import { OrderType } from "../../(publicItems)/orderImformation";
import TimePicker from "./TimePicker";
import SelectDayOnCalendar from "./DateByCalender";

type returnProps = {
    isSelectEmployee: string | string[],
    zurag: string,
    company: CompanyType
    setIsSelectEmployee: (employee: string) => void
    selectedEmployeeImf: string | undefined
    date: Date | null, setDate: (date: Date | null) => void
    setSelectedTime: (time: Date | null) => void
    dayArrays: () => Date[]
    orders: OrderType[] | undefined
    availabilityTimes: () => number[]
    setSelectedEmployee: (employeeId: string) => void
}
export const Return = ({ isSelectEmployee, setSelectedEmployee, zurag, orders, company, availabilityTimes, dayArrays, date, setSelectedTime, setDate, setIsSelectEmployee, selectedEmployeeImf }: returnProps) => {
    const [open, setOpen] = useState<boolean>(false)
    return (<div className="w-full pr-4 flex flex-col ">
        <div className="flex w-full justify-between items-center ">
            <Dialog>
                <DialogTrigger className="w-fit flex gap-3 border rounded-full items-center border-gray-300 p-1">
                    <Avatar>
                        <AvatarImage src={zurag} alt={`ajiltan ${isSelectEmployee}`} />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <div>{isSelectEmployee}</div>
                    <ChevronDown />
                </DialogTrigger>
                <UpdateEmployee setSelectedEmployee={setSelectedEmployee} setSelectedTime={setSelectedTime} setIsSelectEmployee={setIsSelectEmployee} selectedEmployeeImf={selectedEmployeeImf} company={company} zurag={zurag} isSelectEmployee={isSelectEmployee} />
            </Dialog>
            <SelectDayOnCalendar date={date} setDate={setDate} open={open} setOpen={setOpen} />
        </div>
        <div className="flex flex-col gap-8">
            <div className="w-full border mt-2"></div>
            <div className="flex w-full justify-between h-fit ">
                <div className="font-bold">
                    {date !== null
                        ? `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
                        : new Date().toLocaleString("default", { year: "numeric", month: "short" })
                    }
                </div>
                <div className="flex gap-3 items-center"><ChevronLeftIcon size={14} /><ChevronRightIcon size={14} /></div>
            </div>
            <div className="flex w-195 h-fit relative overflow-x-scroll ">{dayArrays().map((day) => {
                return (
                    <div key={day.toString()} onClick={() => {
                        setDate(day);
                    }}
                        className="px-2 flex flex-col  w-fit  justify-center items-center gap-2  py-1 ">
                        <div className={date && date.getDate() === day.getDate()
                            ? "rounded-full  w-24 h-24 flex justify-center items-center  bg-indigo-700"
                            : " flex justify-center items-center rounded-full w-24 h-24 border border-gray-300"}>{day.toLocaleDateString("default", { day: "numeric" })}</div>
                        <div>{day.toLocaleDateString("default", { weekday: "short" })}</div>
                    </div>
                );
            })}</div>
        </div>
        <TimePicker date={date} orders={orders} setDate={setDate} setSelectedTime={setSelectedTime} dayArrays={dayArrays} availabilityTimes={availabilityTimes} />
    </div >)

}