"use client"
import { useEffect, useState } from "react";
import OrderNavBar from "./_components/header";
import { ChevronRight } from "lucide-react";
import EmployeeCard from "./_components/employeeCard";
import { Pacifico } from 'next/font/google'
import OrderImformation from "./_components/orderImformation";
import { api } from "@/axios";
import StageTwo from "./_components/SelectTime"; // Adjust the path based on your project structure
import StagaOne from "./_components/SelectEmployee";
import { error } from "console";

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: '400', // Pacifico зөвхөн 400 жинтэй байдаг
    variable: '--font-pacifico',
})
export type employeeType = {
    _id: string,
    employeeName: string,
    description: string,
    duration: number,
    profileImage: string, availability: boolean,
    startTime: string, endTime: string
}
export type CompanyType = {
    _id: string,
    workingHours: string,
    companyName: string
    address: string
    companyLogo: string
    phoneNumber: number
    description: string
    companyImages: string[]
    employees: [employeeType]
    bookings: string[]
}
export default function OrderPage() {
    const Stages = ["Ажилтан", "Огноо", "Баталгаажуулалт"]
    const [isStage, setIsStage] = useState<string>(Stages[0])
    const [isSelectEmployee, setIsSelectEmployee] = useState<employeeType>()
    const [company, setCompany] = useState<CompanyType | undefined>(undefined)
    const zurag = "/images.jpeg"
    const title = () => {
        return (isStage === Stages[2]) ? `${isStage} хйих` : `${isStage} сонгох`;
    }
    const getCompany = async () => {
        try {
            const response = await api.get("/company/test-company");
            setCompany(response.data.company);
            console.log(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => { getCompany() }, [])
    const HandleNextStage = () => {
        if (isStage == Stages[0] && !(isSelectEmployee?.employeeName == "")) {
            setIsStage(Stages[1])
        }
        if (isStage == Stages[1]) { setIsStage(Stages[2]) }
    };
    return (
        <div className="w-full flex flex-col h-fit jusify-center items-center bg-white">
            <div className="w-[1440px] relative h-[120vh] flex  justify-center" >
                <OrderNavBar isStage={isStage} setIsStage={setIsStage} title={title()} Stages={Stages} />
                <div className="flex-3 relative flex flex-col p-16 gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="gap-2 w-full flex  items-center ">{Stages.map((item, index) => {
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
                        <StagaOne isSelectEmployee={isSelectEmployee?.employeeName || ""} setIsSelectEmployee={setIsSelectEmployee} company={company as CompanyType} />
                    }
                    {isStage == Stages[1] &&
                        (<div className="w-full">
                                {company && (
                                    <StageTwo setIsSelectEmployee={setIsSelectEmployee} company={company} zurag={zurag} isSelectEmployee={isSelectEmployee?.employeeName || ""} />
                                )}
                            </div>)}
                </div>
                <div className="flex flex-2 w-full relative justify-start items-center  ">
                    <OrderImformation HandleNextStage={HandleNextStage} isSelectEmployee={isSelectEmployee?.employeeName || ""} company={company} isStage={isStage} Stages={Stages} />
                </div>
            </div >
        </div >
    )
}