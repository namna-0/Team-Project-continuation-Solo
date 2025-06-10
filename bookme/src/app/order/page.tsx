"use client"
import { useState } from "react";
import OrderNavBar from "./_components/header";


export default function OrderPage() {
    const Stages = ["professional", "time", "confirm"]
    const [isStage, setIsStage] = useState<string>(Stages[0])
    return (
        <div className="w-screen h-dvw  flex flex-col " >
            <div> <OrderNavBar isStage={isStage} setIsStage={setIsStage} title={`select ${isStage}`} /></div>
            <div className="flex gap-2 relative top-16  px-6">{Stages.map((item, index) => {
                return (<div className={item == isStage ? " font-bold flex gap-1" : " flex gap-1 font-normal"} key={index}><p>{item}</p>{'>'}  </div>)

            })}</div>
            <div></div>
            <div></div>
        </div>
    )
}