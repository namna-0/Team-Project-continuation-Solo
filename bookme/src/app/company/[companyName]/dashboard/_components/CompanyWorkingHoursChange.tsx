"use client";
import { Input } from "@/components/ui/input";
import { WorkingHoursType } from "../../_components/CompanyTypes";

type Props = {
    day: keyof WorkingHoursType;
    data: WorkingHoursType[keyof WorkingHoursType];
    onTimeChange: (field: "open" | "close", value: string) => void;
};

export const CompanyWorkingHoursChange = ({ day, data, onTimeChange }: Props) => {
    return (
        <div className="flex gap-10 w-[640px]">
            <div className="w-[300px] flex items-center gap-3 relative">
                <div className="absolute w-fit ml-4">From</div>
                <Input
                    className="flex justify-end border-2 p-5 rounded-[7px]"
                    type="time"
                    value={data.open}
                    onChange={(e) => onTimeChange("open", e.target.value)}
                />
            </div>
            <div className="w-[300px] flex items-center gap-3 relative">
                <div className="absolute w-fit ml-4">To</div>
                <Input
                    className="flex justify-end border-2 p-5 rounded-[7px]"
                    type="time"
                    value={data.close}
                    onChange={(e) => onTimeChange("close", e.target.value)}
                />
            </div>
        </div>
    );
};