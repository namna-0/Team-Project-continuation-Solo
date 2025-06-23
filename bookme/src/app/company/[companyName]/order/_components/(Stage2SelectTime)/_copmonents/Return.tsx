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
import DatePicker from "./DayPicker";
import { da } from "date-fns/locale";

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
    return (
        <div className="w-full pr-4  flex flex-col  gap-6">
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
            <DatePicker date={date} setDate={setDate} dayArrays={dayArrays} company={company}/>
            <TimePicker date={date} orders={orders} setDate={setDate} setSelectedTime={setSelectedTime} dayArrays={dayArrays} availabilityTimes={availabilityTimes} />
        </div >)

}