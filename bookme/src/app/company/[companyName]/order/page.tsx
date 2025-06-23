"use client"
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Pacifico } from 'next/font/google'
import { api } from "@/axios";
import { useParams } from "next/navigation";
import OrderNavBar from "./_components/(publicItems)/header";
import OrderImformation from "./_components/(publicItems)/orderImformation";
import StageTwo from "./_components/(Stage2SelectTime)/SelectTime"; // Adjust the path based on your project structur;
import StagaOne from "./_components/(Stage1EmployeeSelect)/SelectEmployee";
import { WorkingHours } from "@/app/signup/_components/Types";
import { WorkingHoursType } from "../_components/CompanyTypes";

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
    lunchTimeStart: string, lunchTimeEnd: string
    companyId: string
    bookings: string[]
}

export type CompanyType = {
    _id: string,
    workingHours: WorkingHours
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

    const Stages = ["Ажилтан", "Огноо", "амжилттай захиалагдлаа"]
    const [loading, setLoading] = useState<boolean>(false)
    const [isStage, setIsStage] = useState<string>(Stages[0])
    const [isSelectEmployee, setIsSelectEmployee] = useState<string | string[]>("")
    const { companyName } = useParams<{ companyName: string }>();
    const [companyData, setCompany] = useState<CompanyType | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)
    const [selectedEmployeeImf, setSelectedEmployeeImf] = useState<string | undefined>(undefined)
    const title = () => {
        return (isStage === Stages[2]) ? `${isStage} хйих` : `${isStage} сонгох`;
    }
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/company/name/${companyName}`);
                if (response.data && response.data.company) {
                    setCompany(response.data.company);
                    console.log(response.data);


                } else {
                    return ("Компани олдсонгүй");
                }
            } catch (err) {
                console.error("Компаний мэдээлэл авахад алдаа гарлаа:", err);

            } finally {
                setLoading(false);
            }
        };
        if (companyName) {
            fetchCompany();
        }
    }, [companyName]);
    const HandleNextStage = () => {
        if (isStage == Stages[0] && !(isSelectEmployee == "")) { setIsStage(Stages[1]) }
        if (isStage == Stages[1]) { setIsStage(Stages[2]) }
    };
    return (
        <div className="w-full flex flex-col h-fit jusify-center overflow-hidden items-center bg-white">
            <div className="w-[1440px] relative h-[120vh] flex  justify-center bg-gray-100" >
                <OrderNavBar isStage={typeof isStage === "string" ? isStage : ""} setIsStage={setIsStage} title={title()} Stages={Stages} />
                <div className="flex-3 relative flex flex-col p-16 gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="gap-2 w-full flex  items-center ">{Stages.map((item, index) => {
                            return (<div onClick={() => {
                                if (isStage !== "" && Stages.indexOf(isStage) > index) {
                                    setIsStage(item)
                                }
                            }} className={item == isStage ? " font-bold h-fit flex gap-1  text-xl items-center" : " flex text-xl gap-1 font-normal items-center"} key={index}>
                                <p>{item}</p><ChevronRight size={18} />
                            </div>)
                        })}
                        </div>
                        {/* <div className="font-pacifico text-3xl">{title()}</div> */}
                    </div>
                    {isStage == Stages[0] &&
                        <StagaOne isSelectEmployee={isSelectEmployee} setIsSelectEmployee={setIsSelectEmployee} selectedEmployeeImf={selectedEmployeeImf} setSelectedEmployeeImf={setSelectedEmployeeImf} company={companyData as CompanyType} />
                    }
                    {isStage == Stages[1] &&
                        (<div className="w-full">
                            <StageTwo setSelectedEmployee={setSelectedEmployeeImf} setIsSelectEmployee={setIsSelectEmployee} zurag={companyData?.employees?.find((employee: employeeType) => employee._id === selectedEmployeeImf)?.profileImage || ""}
                                date={date} setDate={setDate} setSelectedTime={setSelectedTime} selectedTime={selectedTime} selectedEmployeeImf={selectedEmployeeImf} company={companyData as CompanyType} isSelectEmployee={isSelectEmployee} />
                        </div>)}
                </div>
                <div className="flex flex-2 w-full relative justify-start items-center  ">
                    <OrderImformation setIsStage={setIsStage} HandleNextStage={HandleNextStage} setIsSelectEmployee={setIsSelectEmployee} setSelectEmployee={(employee: string) => setSelectedEmployeeImf(employee)} setDate={setDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} isSelectEmployee={isSelectEmployee} date={date} selectedEmployeeImf={selectedEmployeeImf} company={companyData} isStage={isStage} Stages={Stages} />
                </div>
            </div >
        </div >
    )
}