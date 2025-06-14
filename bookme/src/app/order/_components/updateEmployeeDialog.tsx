"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";
type UpdateEmployeeProps = {
    isSelectEmployee: string, zurag: string
}
function UpdateEmployee({ isSelectEmployee, zurag }: UpdateEmployeeProps) {
    return (
        <Dialog>
            <DialogTrigger className="w-fit flex gap-3 border rounded-full items-center border-gray-300 p-1">
                <Avatar>
                    <AvatarImage src={zurag} alt="@leerob" />
                    <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <div>{isSelectEmployee}</div>
                <ChevronDown />
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="shadow rounded-xl w-full border-none p-6">
                <DialogHeader className="flex flex-col gap-9">
                    <DialogTitle className="text-wrap w-full ">zaaa zahialgiin torol bhgu ym chin uilchilgee awah
                        hunee songono uu l gee bichcihyaa</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>

        </Dialog>

    )
}
export default UpdateEmployee