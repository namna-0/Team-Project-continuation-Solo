"use client"
type EmloyerCardProp = {
    setIsSelectEmployee: (value: string) => void
}
import { useState } from "react";

const EmployeeCard = ({ setIsSelectEmployee }: EmloyerCardProp) => {
    const [isSelect, setIsSelect] = useState(false);
    return (
        <div
            onClick={() => {
                if (!isSelect) {
                    setIsSelectEmployee("hooson bish");
                } else {
                    setIsSelectEmployee("");
                }
                setIsSelect(!isSelect);
            }}
            className={isSelect
                ? "w-fit border border-blue-500 shadow rounded-xl relative aspect-1/1 border px-4 py-8 flex flex-col justify-center gap-6 items-center  hover:bg-zinc-100 "
                : "w-fit border  border-gray-300 shadow rounded-xl relative aspect-1/1 border px-4 py-8 flex flex-col justify-center gap-6 items-center hover:bg-zinc-100  "}
        >
            <img className="w-14 h-14 rounded-full" />
            <div className=" w-4 " >нэр</div>
            <div className="">танилцуулга</div>
        </div>
    );
}
export default EmployeeCard