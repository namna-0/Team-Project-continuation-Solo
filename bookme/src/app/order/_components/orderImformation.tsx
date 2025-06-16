"use client"

import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompanyType, employeeType } from "../page";
import { string } from "zod";
import { is } from "date-fns/locale";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UpdateEmployee from "./updateEmployeeDialog";
type OrderImformationType = {
    HandleNextStage: () => void, isSelectEmployee: string
    company?: CompanyType
    isStage: string
    Stages: string[]

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

function OrderImformation({ HandleNextStage, isSelectEmployee, company, isStage, Stages }: OrderImformationType) {
    const [order, setOrder] = useState<OrderType | undefined>(undefined)
    const [user, setUser] = useState<OrderType | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<Date>()
    const getUser = async () => {
        try {
            const response = await api.get("/user/684d5c0ac9fc32be2dd4e059");
            setUser(response.data.user);
        } catch (error) {
            console.error(error)
        }
    };
    const i = company?.employees.find(employee => employee.employeeName === isSelectEmployee);
    const addOrder = async () => {
        api.post("/order", {
            company: company?._id,
            user: user?._id,
            employee: i?._id,
            selectedTime: selectedTime

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
                            onClick={() => window.open('http://localhost:3000/company/[companyName]', '_blank')}
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
                                <UpdateEmployee zurag={i?.profileImage || ""} isSelectEmployee={isSelectEmployee} />
                            </Dialog>
                            : <div className=" flex flex-col ">{isSelectEmployee}</div>}
                    </div>}
            </div>
            <Button className={isSelectEmployee == "" ? " relative w-full bg-gray-300 text-white" : " raltive w-full bg-black text-white "} onClick={HandleNextStage}>continue</Button>
        </div >
    )
}
export default OrderImformation