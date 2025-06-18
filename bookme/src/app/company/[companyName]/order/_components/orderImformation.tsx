"use client"

import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompanyType, employeeType } from "../page";
import { date, string } from "zod";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/app/_providers/UserAuthProvider";
import UpdateEmployee from "./(Stage1EmployeeSelect)/updateEmployeeDialog";
import { Calendar, Calendar1Icon, Clock5Icon } from "lucide-react";
type OrderImformationType = {
    HandleNextStage: () => void, isSelectEmployee: string | string[]
    company?: CompanyType
    isStage: string
    Stages: string[]
    setIsSelectEmployee: (employee: string) => void
    date: Date
    selectedTime: Date | undefined
    setSelectedTime: (time: Date) => void
    selectedEmployeeImf: string | undefined
}
export type OrderType = {
    _id?: string;
    company: string,
    user: string;
    employee: string;
    selectedTime: string
};
type user = {
    _id?: string,
    username: string,
    phoneNumber: number,
    booking: string[],
    email: string,
    address: string,
    role: string,
    companyId: string[],
}
function OrderImformation({
    HandleNextStage,
    setIsSelectEmployee,
    isSelectEmployee,
    selectedTime,
    setSelectedTime,
    selectedEmployeeImf,
    company, isStage, Stages }: OrderImformationType) {
    const { user } = useAuth()
    const [order, setOrder] = useState<OrderType | undefined>(undefined)


    const i = company?.employees.find((employee) => employee.employeeName === isSelectEmployee);
    const addOrder = async () => {
        api.post("/order", {
            company: "684f8b0a76ced7d73b215599",
            user: user?._id,
            employee: selectedEmployeeImf,
            selectedTime: selectedTime?.toISOString(),
        }).then((response) => {
            console.log("Order added successfully", response.data);


        }
        ).catch((error) => {
            console.error("Error adding order", error);
        })
    }

    return (
        <div className="flex border absolute top-56 border-gray-300 p-6 flex-col rounded-xl w-100 min-h-130 justify-between ">
            <div className="w-full flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="w-24 h-24 rounded border hover:border-blue-700 transition flex justify-center items-center p-3 ">
                        <img
                            src={company ? company.companyImages[0] : undefined}
                            onClick={() => window.open(`http://localhost:3000/company/[companyName]`, '_blank')}
                            className="w-full h-full object-cover rounded "
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="text-2xl font-bold">{company?.companyName}</div>
                        <div className="text-10 text-gray-300">{company?.address}</div>
                    </div></div>

                {isSelectEmployee && isStage <= Stages[1] &&
                    <div className="flex w-full justify-between ">
                        <div className="text-sm  text-gray-400 font-bold">үйлчилгээний ажилтан: </div>
                        {isStage == Stages[1]
                            ? <Dialog>
                                <DialogTrigger className="w-fit flex gap-3  rounded-full items-centerp-1">
                                    <div className="text-sky-600">{isSelectEmployee}</div>
                                </DialogTrigger>
                                <UpdateEmployee setIsSelectEmployee={setIsSelectEmployee} zurag={i?.profileImage || ""} company={company as CompanyType} isSelectEmployee={isSelectEmployee} />
                            </Dialog>
                            : <div className=" flex flex-col ">{isSelectEmployee}</div>}
                    </div>}
                {selectedTime !== undefined &&
                    (<div>
                        <div className="flex gap-3 text-gray-300 ">
                            <Calendar /> {selectedTime.toDateString()}
                        </div>
                        <div><Clock5Icon />{selectedTime.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                        })}</div>
                    </div>)}
            </div>
            <Button className={isSelectEmployee == "" ? " relative w-full bg-gray-300 text-white" : " relative w-full bg-black text-white "} onClick={() => {
                HandleNextStage()
                if (isStage == Stages[2]) {
                    addOrder()
                    setIsSelectEmployee("")
                    setSelectedTime(new Date())

                }
            }}>continue</Button>
        </div >
    )
}
export default OrderImformation