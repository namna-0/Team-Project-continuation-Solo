"use client"
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { useParams } from "next/navigation";
import { CompanyType } from "./_components/(publicItems)/_OrderPageTypes/types";
import { BookingPage } from "./_components/(BookingProcess)/bookingProcess";

export default function OrderPage() {
    const Stages = ["Ажилтан", "Огноо", "Баталгаажуулалт", "амжилттай захиалагдлаа"]
    const [loading, setLoading] = useState<boolean>(false)
    const [isStage, setIsStage] = useState<string>(Stages[0])
    const [isSelectEmployee, setIsSelectEmployee] = useState<string | string[]>("")
    const { companyName } = useParams<{ companyName: string }>();
    const [companyData, setCompany] = useState<CompanyType | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)
    const [selectedEmployeeImf, setSelectedEmployeeImf] = useState<string | undefined>(undefined)
    useEffect(() => {
        const fetchCompany = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/company/name/${companyName}`);
                if (response.data && response.data.company) {
                    setCompany(response.data.company);
                    console.log(response.data);
                } else {
                    console.warn("Компани олдсонгүй");
                }
                setLoading(false);
            } catch (err) {
                console.error("Компаний мэдээлэл авахад алдаа гарлаа:", err);
                setLoading(false);
            }
        };
        if (companyName) {
            fetchCompany();
        }
    }, [companyName]);

    if (loading) return (
        <div className="w-full h-screen flex justify-center items-center">
            <p className="text-xl font-semibold text-gray-700">Түр хүлээнэ үү... ⏳</p>
        </div>
    );
    const HandleNextStage = () => {
        if (isStage == Stages[0] && !(isSelectEmployee == "")) { setIsStage(Stages[1]) }
        if (isStage == Stages[1] && selectedTime !== null) { setIsStage(Stages[2]) }
    };
    return (
        Stages.indexOf(isStage) < Stages.length ? (
            <BookingPage
                date={date} setDate={setDate} isStage={isStage} setIsStage={setIsStage}
                isSelectEmployee={isSelectEmployee} setIsSelectEmployee={setIsSelectEmployee}
                selectedTime={selectedTime} setSelectedTime={setSelectedTime}
                selectedEmployeeImf={selectedEmployeeImf} setSelectedEmployeeImf={setSelectedEmployeeImf}
                HandleNextStage={HandleNextStage}
                companyData={companyData}

            />
        ) : (<div></div>)
    )
}