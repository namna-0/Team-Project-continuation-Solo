"use client"

import { useEffect, useState } from "react"
import { CompanyType, employeeType } from "../../page"
import { api } from "@/axios"
import { Return } from "./_copmonents/SmallParts"

type TimingProps = {
    isSelectEmployee: string | string[],
    zurag: string,
    company: CompanyType
    setIsSelectEmployee: (employee: string) => void
    selectedEmployeeImf: string | undefined
    date: Date, setDate: (date: Date) => void
    setSelectedTime: (time: Date) => void
    selectedTime: Date | null
    setSelectedEmployee: (employeeId: string) => void
}
function StageTwoTimePicking({
    isSelectEmployee, setSelectedEmployee, zurag, company, date, selectedTime, setSelectedTime, setDate, setIsSelectEmployee, selectedEmployeeImf
}: TimingProps) {
    const [startDay, SetStartDay] = useState<Boolean>(true)
    const getEmployee = company?.employees.find((employee: employeeType) => employee._id === selectedEmployeeImf);
    const getTime = (hour: number) => hour * 60;
    const dayArrays = () => {
        const days = [];
        let current = new Date();
        const end = new Date();
        end.setMonth(end.getMonth() + 6); // 6 сарын дараах өдөр
        while (current <= end) {
            const dayOfWeek = current.getDay();
            days.push(new Date(current)); // copy date
            current.setDate(current.getDate() + 1); // дараагийн өдөр рүү
        }
        return days;
    }
    const start = getEmployee ? parseInt(getEmployee.startTime) : 0;
    const duration = getEmployee ? parseInt(getEmployee.duration.toString()) : 0;
    const end = getEmployee ? parseInt(getEmployee.endTime) : 0;
    const lunchTime = getEmployee ? parseInt(getEmployee.lunchTimeStart) : 0; console.log(lunchTime);
    const LunchTimeEnd = getEmployee ? parseInt(getEmployee.lunchTimeEnd) : 0; console.log(LunchTimeEnd);
    const availabilityTimes = () => {
        const times = [];
        for (let i = getTime(start); i < getTime(end); i += duration) {
            if (!(i >= getTime(lunchTime) && i < getTime(LunchTimeEnd))) {
                times.push(i);
            }
        }
        return times;
    };
    const getOrderByemployee = async () => {
        try {
            const response = await api.get(`/order/employee/${selectedEmployeeImf}`);
            const orders = response.data.orders;
            console.log("Orders by employee:", orders);
        } catch (error: any) {
            console.error("Error fetching orders by employee:", error);
        }
    }

    useEffect(() => {
        getEmployee
        selectedEmployeeImf
       getOrderByemployee();
    }, [selectedEmployeeImf, isSelectEmployee, company?.employees])
    useEffect(() => {
        setDate(date)
        setSelectedTime(selectedTime ?? new Date())
    }, [selectedTime])
    return (<Return dayArrays={dayArrays} availabilityTimes={availabilityTimes} isSelectEmployee={isSelectEmployee} setSelectedEmployee={setSelectedEmployee} zurag={zurag} company={company} date={date} setSelectedTime={setSelectedTime} setDate={setDate} setIsSelectEmployee={setIsSelectEmployee} selectedEmployeeImf={selectedEmployeeImf} />
    )

}
export default StageTwoTimePicking