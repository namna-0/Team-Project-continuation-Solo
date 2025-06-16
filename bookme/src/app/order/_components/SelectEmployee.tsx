"use client"

import { CompanyType, employeeType } from "../page"
import EmployeeCard from "./employeeCard"

type StagOneProps = {
    company: CompanyType
    isSelectEmployee:string
    setIsSelectEmployee: (employee: employeeType) => void

}
export default function StagaOneSelectEmployee({ company, isSelectEmployee,setIsSelectEmployee}: StagOneProps) {
    const i = company?.employees.find(employee => employee.employeeName === isSelectEmployee);
    return (<div className="grid grid-cols-3 w-fit gap-10 justify-between ">{
        company?.employees.map((item, index) => (
            <div key={index} className={item.employeeName == i?.employeeName? ` relative justify-center w-full p-5 rounded-xl bg-clip-border md:bg-clip-padding border  border-sky-600` : " relative justify-center w-full p-5 rounded-xl bg-clip-border md:bg-clip-padding border border-gray-400"}
                onClick={() => { if (i?.employeeName=== "" || i?.employeeName !== item.employeeName) setIsSelectEmployee(item) }}>
                {item.availability == true &&
                    <EmployeeCard ner={item.employeeName} mergejil={item.description} captionText={(i?.employeeName == item.employeeName ? `${item.employeeName} дээр цаг захиалсан байна` : `${item.employeeName} дээр цаг захиалах`)} zurag="/images.jpeg" />
                } </div>
        ))}
    </div>)
}