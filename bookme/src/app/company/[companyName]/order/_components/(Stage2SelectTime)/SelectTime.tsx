
"use client"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Popover } from "@radix-ui/react-popover"
import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import UpdateEmployee from "../(Stage1EmployeeSelect)/updateEmployeeDialog"
import { CompanyType, employeeType } from "../../page"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { enGB, se } from "date-fns/locale"
import { isToday, set } from "date-fns"
type TimingProps = {
    isSelectEmployee: string | string[],
    zurag: string,
    company: CompanyType
    setIsSelectEmployee: (employee: string) => void
    selectedEmployeeImf: string | undefined
    date: Date, setDate: (date: Date) => void
    setSelectedTime: (time: Date) => void
    selectedTime: Date | null
}
function StageTwoTimePicking({ isSelectEmployee, zurag, company, date, selectedTime, setSelectedTime, setDate, setIsSelectEmployee, selectedEmployeeImf }: TimingProps) {
    const [open, setOpen] = useState(false)

    const [startDay, SetStartDay] = useState<Date>(() => {
        const now = new Date();
        now.setHours(0);
        return now;
    });
    const getEmployee = company?.employees.find((employee: employeeType) => employee._id === selectedEmployeeImf);
    const getTime = (hour: number) => hour * 60;
    const dayArrays = () => {
        const days = [];
        let current = new Date();
        const end = new Date();
        end.setMonth(end.getMonth() + 6); // 6 сарын дараах өдөр
        while (current <= end) {
            const dayOfWeek = current.getDay();
            days.push(new Date(current)); // copy date
            current.setDate(current.getDate() + 1); // дараагийн өдөр рүү
        }
        return days;
    }
    const start = getEmployee ? parseInt(getEmployee.startTime) : 0;
    const duration = getEmployee ? parseInt(getEmployee.duration.toString()) : 0;
    const end = getEmployee ? parseInt(getEmployee.endTime) : 0;
    const lunchTime = getEmployee ? parseInt(getEmployee.lunchTimeStart) : 0; console.log(lunchTime);

    const LunchTimeEnd = getEmployee ? parseInt(getEmployee.lunchTimeEnd) : 0; console.log(LunchTimeEnd);

    const availabilityTimes = () => {
        const times = [];
        for (let i = getTime(start); i < getTime(end); i += duration) {
            if (!(i >= getTime(lunchTime) && i < getTime(LunchTimeEnd))) {
                times.push(i);
            }
        }
        return times;
    };

    useEffect(() => {
        setDate(date)
        setSelectedTime(selectedTime ?? new Date())

    }, [selectedTime])
    return (
        <div className="w-full pr-4 flex flex-col ">
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
                    <UpdateEmployee setIsSelectEmployee={setIsSelectEmployee} company={company} zurag={zurag} isSelectEmployee={isSelectEmployee} />
                </Dialog>
                <div className="">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger >
                            <CalendarIcon size={30} />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-2 z-10 flex  bg-white " align="center">
                            <Calendar className="flex gap-3"
                                locale={enGB}
                                mode="single"
                                selected={date}
                                buttonVariant="ghost"
                                onMonthChange={(month) => {
                                    setDate(new Date(month.getFullYear(), month.getMonth(), isToday(new Date()) ? new Date().getDate() : 1));
                                }}
                                modifiers={{ today: (date) => isToday(date) }}
                                modifiersClassNames={{
                                    today: 'bg-gray-300 text-gray-600 font-semibold',
                                }}
                                onSelect={(date) => {
                                    setDate(date ? date : new Date());
                                    SetStartDay(date ? date : new Date());
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
                <div className="flex w-199 overflow-x-scroll h-fit ">{dayArrays().map((day) => {
                    return (
                        <div key={day.toString()} onClick={() => {
                            setDate(day);
                            SetStartDay(day);
                        }} className="px-2 flex flex-col  w-fit  justify-center items-center gap-2  py-1 ">
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
        </div >
    )

}
export default StageTwoTimePicking