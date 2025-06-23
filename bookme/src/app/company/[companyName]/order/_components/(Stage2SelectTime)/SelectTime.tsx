"use client"

import { use, useEffect, useState } from "react"
import { CompanyType, employeeType } from "../../page"
import { api } from "@/axios"
import { Return } from "./_copmonents/Return"
import { OrderType } from "../(publicItems)/orderImformation"

type TimingProps = {
    isSelectEmployee: string | string[],
    zurag: string,
    company: CompanyType
    setIsSelectEmployee: (employee: string) => void
    selectedEmployeeImf: string | undefined
    date: Date | null, setDate: (date: Date | null) => void
    setSelectedTime: (time: Date | null) => void
    selectedTime: Date | null
    setSelectedEmployee: (employeeId: string) => void
}
function StageTwoTimePicking({
    isSelectEmployee, setSelectedEmployee, zurag, company, date, selectedTime, setSelectedTime, setDate, setIsSelectEmployee, selectedEmployeeImf
}: TimingProps) {
    const [orders, setOrders] = useState<OrderType[] | undefined>(undefined)
    const [startDay, SetStartDay] = useState<Boolean>(true)
    const getEmployee = company?.employees.find((employee: employeeType) => employee._id === selectedEmployeeImf);
    const getTime = (hour: number) => hour * 60;
    const dayArrays = () => {
        const days: Date[] = [];
        let current = new Date();
        const end = new Date();
        end.setMonth(end.getMonth() + 3);
        const dayKeyMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        while (current <= end) {
          const dayIndex = current.getDay();
          const key = dayKeyMap[dayIndex];
          const dayInfo = company.workingHours[key];
            days.push(new Date(current));
      
      
          current.setDate(current.getDate() + 1);
        }
      
        return days;
      };  
    const start = getEmployee ? parseInt(getEmployee.startTime) : 0;
    const duration = getEmployee ? parseInt(getEmployee.duration.toString()) : 0;
    const end = getEmployee ? parseInt(getEmployee.endTime) : 0;
    const lunchTime = getEmployee ? parseInt(getEmployee.lunchTimeStart) : 0;
    const LunchTimeEnd = getEmployee ? parseInt(getEmployee.lunchTimeEnd) : 0;
    const availabilityTimes = () => {
        const times = [];
        for (let i = getTime(start); i < getTime(end); i += duration) {
            if (!(i >= getTime(lunchTime) && i < getTime(LunchTimeEnd))) {
                times.push(i);
            }
        }
        return times;
    };
    useEffect(() => {
        getEmployee
        selectedEmployeeImf
    }, [isSelectEmployee, company?.employees])
    const getOrderByemployee = async () => {
        try {
            const response = await api.get(`/order/employee/${selectedEmployeeImf}`);
            setOrders(response.data.bookings)
            console.log("Orders by employee:", orders);
        } catch (error: any) {
            console.error("Error fetching orders by employee:", error);
        }
    }
    useEffect(() => { setDate(date) }, [date])
    useEffect(() => { getOrderByemployee() }, [selectedEmployeeImf])
    useEffect(() => { setDate(new Date()) }, [, isSelectEmployee])
    return (
        <Return
            orders={orders} dayArrays={dayArrays} availabilityTimes={availabilityTimes}
            isSelectEmployee={isSelectEmployee} setSelectedEmployee={setSelectedEmployee} zurag={zurag}
            company={company} date={date} setSelectedTime={setSelectedTime} setDate={setDate}
            setIsSelectEmployee={setIsSelectEmployee} selectedEmployeeImf={selectedEmployeeImf} />
    )
}
export default StageTwoTimePicking