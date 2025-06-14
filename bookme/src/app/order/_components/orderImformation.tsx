"use client"

import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompanyType } from "../page";
type OrderImformationType = {
    HandleNextStage: () => void, isSelectEmployee: string
    company?: CompanyType[]
}
export type OrderType = {
    _id?: string;
    company: string,
    user: string;
    employee: string;
    selectedTime: string
};
function OrderImformation({ HandleNextStage, isSelectEmployee }: OrderImformationType) {
    const [order, setOrder] = useState<OrderType | undefined>(undefined)
    const CreateOrder = async () => {
        try {
            const response = await api.post("/order");
            setOrder(response.data.company);
            console.log(order);

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="flex border absolute top-20 border-gray-300 p-6 flex-col rounded-xl w-100 aspect-4/5 justify-between ">
            <div>asdasd</div>
            <Button className={isSelectEmployee == "" ? "w-full bg-gray-300 text-white" : "w-full bg-black text-white "} onClick={HandleNextStage}>continue</Button>
        </div>
    )
}
export default OrderImformation