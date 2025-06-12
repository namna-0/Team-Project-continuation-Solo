"use client"
import { useState } from "react";
import OrderNavBar from "./_components/header";
import { ChevronRight } from "lucide-react";
import { EmployeeSvg } from "../company/[companyName]/settings/_components/assets/EmployeeSvg";
import EmployeeCard from "./_components/employeeCard";
import { useEffect } from "react";
import { Pacifico } from 'next/font/google'
import { Button } from "@/components/ui/button";
import OrderImformation from "./_components/orderImformation";
import AddTime from "./_components/timingSelection";

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: '400', // Pacifico зөвхөн 400 жинтэй байдаг
    variable: '--font-pacifico',
})
export default function OrderPage() {
    const Stages = ["Ажилтан", "Огноо", "Баталгаажуулалт"]
    const [isStage, setIsStage] = useState<string>(Stages[0])
    const [isSelectEmployee, setIsSlelctmployee] = useState<string>("")
    const title = () => {
        return (isStage === Stages[2]) ? `${isStage} хйих` : `${isStage} сонгох`;
    }
    const HandleNextStage = () => {
        if (isStage == Stages[0] && !(isSelectEmployee == "")) {
            setIsStage(Stages[1])
        }
        if (isStage == Stages[1]) { setIsStage(Stages[2]) }
    };
    return (
        <div className="w-screen h-[120vh] flex flex-col p-6" >
            <div > <OrderNavBar isStage={isStage} setIsStage={setIsStage} title={title()} Stages={Stages} /></div>
            <div className=" relative flex flex-col w-[60vw] p-16 gap-8">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-2 items-center ">{Stages.map((item, index) => {
                        return (<div onClick={() => {
                            if (Stages.indexOf(isStage) > index) {
                                setIsStage(item)
                            }
                        }} className={item == isStage ? " font-bold h-fit flex gap-1  text-xl items-center" : " flex text-xl gap-1 font-normal items-center"} key={index}><p>{item}</p><ChevronRight size={16} />
                        </div>)
                    })}
                    </div>
                    <div className="font-pacifico text-3xl">{title()}</div>
                </div>
                {isStage == Stages[0] &&
                    (<div className="grid grid-cols-3 w-fit gap-10 justify-between "><EmployeeCard setIsSelectEmployee={setIsSlelctmployee} />
                        <EmployeeCard setIsSelectEmployee={setIsSlelctmployee} /><EmployeeCard setIsSelectEmployee={setIsSlelctmployee} /><EmployeeCard setIsSelectEmployee={setIsSlelctmployee} />
                    </div>)}
                {isStage == Stages[1] &&
                    (<div className="w-full"><AddTime isSelectEmployee={isSelectEmployee} /></div>)}
                <div> <OrderImformation HandleNextStage={HandleNextStage} isSelectEmployee={isSelectEmployee} />
                </div>
            </div>
        </div >
    )
}