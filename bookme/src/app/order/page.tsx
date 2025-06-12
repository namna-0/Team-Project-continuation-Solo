"use client"
import { useState } from "react";
import OrderNavBar from "./_components/header";
import { ChevronRight } from "lucide-react";
import EmployeeCard from "./_components/employeeCard";
import { Pacifico } from 'next/font/google'
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
        <div className="w-full flex flex-col h-fit jusify-center items-center">
            <div className="w-[1440px] relative h-[120vh] flex  justify-center" >
                <OrderNavBar isStage={isStage} setIsStage={setIsStage} title={title()} Stages={Stages} />
                <div className="flex w-full flex-2">
                    <div className="w-full relative flex flex-col w-full p-16 gap-8">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2 w-full display: block items-center ">{Stages.map((item, index) => {
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
                    </div>
                </div>
                <div className="flex flex-1 w-full border  relative border-red-400 justify-start items-center  ">
                    <OrderImformation HandleNextStage={HandleNextStage} isSelectEmployee={isSelectEmployee} />
                </div>
            </div >
        </div>
    )
}