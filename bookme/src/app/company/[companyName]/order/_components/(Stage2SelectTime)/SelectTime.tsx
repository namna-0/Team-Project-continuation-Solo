
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Popover } from "@radix-ui/react-popover"
import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import UpdateEmployee from "../(Stage1EmployeeSelect)/updateEmployeeDialog"
import { CompanyType, employeeType } from "../../page"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DayPicker, useDayPicker } from "react-day-picker"
import { enGB } from "date-fns/locale"
import { isToday } from "date-fns"
type TimingProps = {
    isSelectEmployee: string, zurag: string,
    company: CompanyType
    setIsSelectEmployee: (employee: string) => void

}
function StageTwoTimePicking({ isSelectEmployee, zurag, company, setIsSelectEmployee }: TimingProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>(new Date)
    const [startDay, SetStartDay] = useState<Date>(() => {
        const now = new Date();
        now.setHours(0);
        return now;
    });
    const getEmployee = company?.employees.find((employee: employeeType) => employee.employeeName === isSelectEmployee);
    const getTime = (hour: number) => hour * 60;

    const dayPickerProps = {
        fromDate: isToday(startDay) ? new Date() : startDay,
        toDate: new Date(startDay.getFullYear(), startDay.getMonth() + 1, startDay.getDate())
    };
    const start = getEmployee ? parseInt(getEmployee.startTime) : 0;
    const duration = getEmployee ? parseInt(getEmployee.duration.toString()) : 0;
    const end = getEmployee ? parseInt(getEmployee.endTime) : 0;
    const lunchTime = getEmployee ? parseInt(getEmployee.lunchTimeStart) : 0;
    const availabilityTimes = () => {
        const times = [];
        for (let i = getTime(start); i < getTime(end); i += duration) {
            if (i !== getTime(lunchTime)) {
                times.push(i);
            }
        }
        return times;
    };
    useEffect(() => {

    })
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
                                initialFocus={true}
                                mode="single"
                                selected={date}
                                // captionLayout="dropdown"
                                buttonVariant="ghost"
                    
                                onMonthChange={(month) => {
                                    setDate(new Date(month.getFullYear(), month.getMonth(), 1));
                                }}
                                modifiers={{ today: (date) => isToday(date) }}
                                modifiersClassNames={{
                                    today: 'bg-blue-100 text-blue-600 font-semibold',
                                }}
                                // Removed invalid property 'selectedModifiers'
                                // selectedModifiers={{ selected: (date) => date.getDate() === new Date().getDate() }}
                                // onDayClick={(day) => {
                                //     setDate(day);
                                //     SetStartDay(day);
                                //     setOpen(false);
                                // }}       
                                onSelect={(date) => {
                                    setDate(date ? date : new Date)
                                    SetStartDay(date ? date : new Date)
                                    setOpen(false)
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
            </div>
            <div className="text-gray-500 text-sm mt-2 flex flex-col gap-4">{dayPickerProps.toDate.toLocaleDateString('en-US', { weekday: 'short' })}, {dayPickerProps.toDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </div>
            <div className="flex gap-2 flex-wrap">
                {availabilityTimes().map((time, index) => {
                    const hour = Math.floor(time / 60);
                    const minute = time % 60;
                    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    return (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded" onClick={() => {
                            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)); console.log(date);
                        }}>
                            {formattedTime}
                        </span>
                    );
                })}
            </div>
        </div >
    )
}
export default StageTwoTimePicking