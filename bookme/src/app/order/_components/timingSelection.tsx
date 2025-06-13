
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Popover } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import UpdateEmployee from "./updateEmployeeDialog"

type TimingProps = {
    isSelectEmployee: string
}
function AddTime({ isSelectEmployee }: TimingProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <div className="w-full pr-4">
            <div className="flex w-full justify-between items-center ">
                <UpdateEmployee isSelectEmployee={isSelectEmployee} />
                <div className=" relative z-10">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <CalendarIcon />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-2 z-10 bg-white " align="center">
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
        </div>
    )
}
export default AddTime