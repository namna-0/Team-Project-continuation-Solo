"use client"

import { Button } from "@/components/ui/button";
type OrderImformationType = {
    HandleNextStage: () => void, isSelectEmployee: string
}
function OrderImformation({ HandleNextStage, isSelectEmployee }: OrderImformationType) {
    return (
        <div className="flex border absolute top-20 border-gray-300 p-6 flex-col rounded-xl w-100 aspect-4/5 justify-between ">
            <div>asdasd</div>
            <Button className={isSelectEmployee == "" ? "w-full bg-gray-300 text-white" : "w-full bg-black text-white "} onClick={HandleNextStage}>continue</Button>
        </div>
    )
}
export default OrderImformation