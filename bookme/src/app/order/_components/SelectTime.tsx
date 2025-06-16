
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Popover } from "@radix-ui/react-popover"
import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import UpdateEmployee from "./updateEmployeeDialog"
import { CompanyType, employeeType } from "../page"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type TimingProps = {
    isSelectEmployee: string, zurag: string
    company: CompanyType
    setIsSelectEmployee: (employee: employeeType) => void

}
function StageTwoTimePicking({ isSelectEmployee, zurag ,company,setIsSelectEmployee }: TimingProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [startDay, SetStartDay] = useState<Date>()
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
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                buttonVariant="ghost"
                                onSelect={(date) => {
                                    setDate(date)
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
                    <div className="font-bold">{date !== undefined && `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`}</div>
                    <div className="flex gap-3 items-center"><ChevronLeftIcon size={14} /><ChevronRightIcon size={14} /></div>
                </div></div>

        </div >
    )
}
export default StageTwoTimePicking