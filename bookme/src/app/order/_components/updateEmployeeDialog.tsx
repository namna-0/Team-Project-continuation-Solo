"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { ChevronDown } from "lucide-react";
import { CompanyType, employeeType } from "../page";
import EmployeeCard from "./employeeCard";
type UpdateEmployeeProps = {
    isSelectEmployee: string, zurag?: string,
    company: CompanyType,
    setIsSelectEmployee: (employee: employeeType) => void

}
function UpdateEmployee({ isSelectEmployee,  company, setIsSelectEmployee, }: UpdateEmployeeProps) {
    return (
        <DialogContent showCloseButton={false} className="shadow rounded-xl w-full border-none p-6">
            <DialogHeader className="flex flex-col gap-9">
                <DialogTitle className="text-wrap w-full ">zaaa zahialgiin torol bhgu ym chin uilchilgee awah
                    hunee songono uu l gee bichcihyaa</DialogTitle>
                <DialogDescription>{
                    company?.employees.map((item, index) => (
                        <div key={index} className={item.employeeName == isSelectEmployee ? ` relative justify-center w-full p-5 rounded-xl bg-clip-border md:bg-clip-padding border  border-sky-600` : " relative justify-center w-full p-5 rounded-xl bg-clip-border md:bg-clip-padding border border-gray-400"}
                            onClick={() => { if (isSelectEmployee === "" || isSelectEmployee !== item.employeeName) setIsSelectEmployee(item) }}>
                            {item.availability == true &&
                                <EmployeeCard ner={item.employeeName} mergejil={item.description} captionText={(isSelectEmployee == item.employeeName ? `${item.employeeName} дээр цаг захиалсан байна` : `${item.employeeName} дээр цаг захиалах`)} zurag="/images.jpeg" />
                            } </div>
                    ))}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )
}
export default UpdateEmployee