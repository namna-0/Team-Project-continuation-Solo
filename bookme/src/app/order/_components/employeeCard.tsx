"use client"
import { useState } from "react";
type EmployeeCardProps = { ner: string, mergejil: string, zurag: string }
const EmployeeCard = ({ ner, mergejil, zurag }: EmployeeCardProps) => {

    return (
        <div className="w-fit border  border-gray-300 shadow rounded-xl relative aspect-1/1 border px-4 py-8 flex flex-col justify-center gap-6 items-center hover:bg-zinc-100  ">
            <img className="w-14 h-14 rounded-full" src={zurag} />
            <div className=" w-4 " >{ner}</div>
            <div className="">{mergejil}</div>
        </div >
    );
}
export default EmployeeCard