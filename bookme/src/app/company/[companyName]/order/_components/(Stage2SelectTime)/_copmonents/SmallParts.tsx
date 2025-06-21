"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import UpdateEmployee from "../../(Stage1EmployeeSelect)/updateEmployeeDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FormatLongFnOptions, isToday } from "date-fns";
import { CompanyType } from "../../../page";
import { useState } from "react";

type returnProps = {
    isSelectEmployee: string | string[],
    zurag: string,
    company: CompanyType
    setIsSelectEmployee: (employee: string) => void
    selectedEmployeeImf: string | undefined
    date: Date, setDate: (date: Date) => void
    setSelectedTime: (time: Date) => void
    dayArrays: () => Date[]
    availabilityTimes: () => number[]
    setSelectedEmployee: (employeeId: string) => void
}
export const Return = ({ isSelectEmployee, setSelectedEmployee, zurag, company, availabilityTimes, dayArrays, date, setSelectedTime, setDate, setIsSelectEmployee, selectedEmployeeImf }: returnProps) => {
    const [open, setOpen] = useState(false)
    return (<div className="w-full pr-4 flex flex-col ">
        <div className="flex w-full justify-between items-center ">
            <Dialog>
                <DialogTrigger className="w-fit flex gap-3 border rounded-full items-center border-gray-300 p-1">
                    <Avatar>
                        <AvatarImage src={zurag} alt="@leerob" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <div>{isSelectEmployee}</div>
                    <ChevronDown />
                </DialogTrigger>
                <UpdateEmployee setSelectedEmployee={setSelectedEmployee} setIsSelectEmployee={setIsSelectEmployee} selectedEmployeeImf={selectedEmployeeImf} company={company} zurag={zurag} isSelectEmployee={isSelectEmployee} />
            </Dialog>
            <div className="">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger >
                        <CalendarIcon size={30} />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-2 z-10 flex  bg-white " align="center">
                        <Calendar className="flex gap-3"
                            locale={{
                                code: 'mn', formatLong: {
                                    date: () => new Date().toLocaleDateString('mn-MN'),
                                    time: function (options: FormatLongFnOptions): string {
                                        throw new Error("Function not implemented.");
                                    },
                                    dateTime: function (options: FormatLongFnOptions): string {
                                        throw new Error("Function not implemented.");
                                    }
                                }
                            }}
                            mode="single"
                            selected={date}
                            buttonVariant="ghost"
                            captionLayout="dropdown"
                            fromYear={new Date().getFullYear()} // өнөөдрийн оноос эхэлнэ
                            toYear={new Date().getFullYear() + 1} // дараа жилийн эхний сар хүртэл
                            onMonthChange={(month) => {
                                setDate(new Date(month.getFullYear(), month.getMonth(), isToday(new Date()) ? new Date().getDate() : 1));
                            }}
                            fromMonth={new Date(new Date().getFullYear(), new Date().getMonth())} // өнөөдрийн сар
                            toMonth={new Date(new Date().getFullYear(), new Date().getMonth() + 6)}
                            modifiers={{ today: (date) => isToday(date) }}
                            disabled={{ before: new Date() }}
                            onSelect={(date) => {
                                setDate(date ? date : new Date());
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
        <div className="flex flex-col gap-8">
            <div className="w-full border mt-2"></div>
            <div className="flex w-full justify-between h-fit ">
                <div className="font-bold">{`${date?.toLocaleString("default", { month: "short" })} ${date?.getFullYear()}`}</div>
                <div className="flex gap-3 items-center"><ChevronLeftIcon size={14} /><ChevronRightIcon size={14} /></div>
            </div>
            <div className="flex w-195 overflow-x-scroll h-fit ">{dayArrays().map((day) => {
                return (
                    <div key={day.toString()} onClick={() => {
                        setDate(day);

                    }}
                        className="px-2 flex flex-col  w-fit  justify-center items-center gap-2  py-1 ">
                        <div className={date.getDate() === day.getDate()
                            ? "rounded-full  w-24 h-24 flex justify-center items-center  bg-indigo-700"
                            : " flex justify-center items-center rounded-full w-24 h-24 border border-gray-300"}>{day.toLocaleDateString("default", { day: "numeric" })}</div>
                        <div>{day.toLocaleDateString("default", { weekday: "short" })}</div>
                    </div>
                );
            })}</div>
        </div>
        <div className="grid gap-3 grid-cols-3" >
            {availabilityTimes().map((time, index) => {
                const hour = Math.floor(time / 60);
                const minute = time % 60;
                const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                return (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded" onClick={() => {
                        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
                        setDate(newDate);
                        setSelectedTime(newDate);
                    }}>
                        {formattedTime}
                    </span>
                );
            })}
        </div >
    </div >)

}