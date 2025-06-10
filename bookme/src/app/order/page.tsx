"use client"
import { useState } from "react";
import OrderNavBar from "./_components/header";
import { ChevronRight } from "lucide-react";
export default function OrderPage() {
    const Stages = ["Ажилтан", "Огноо", "Баталгаажуулалт"]
    const [isStage, setIsStage] = useState<string>(Stages[0])
    const title = () => {
        return (isStage === Stages[2]) ? `${isStage} хйинэ үү` : `${isStage} сонгоно уу`;
    }
    return (
        <div className="w-screen h-dvw  flex flex-col p-6" >
            <div> <OrderNavBar isStage={isStage} setIsStage={setIsStage} title={title()} Stages={Stages} /></div>
            <div className="relative flex w-full flex-col px-16">
                <div className="flex gap-2 relative top-16 items-center ">{Stages.map((item, index) => {
                    return (<div className={item == isStage ? " font-bold h-fit flex gap-1  text-xl items-center" : " flex text-xl gap-1 font-normal items-center"} key={index}><p>{item}</p><ChevronRight size={16}/>
                    </div>)
                })}
                </div>
                <div className="w-full flex"></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}