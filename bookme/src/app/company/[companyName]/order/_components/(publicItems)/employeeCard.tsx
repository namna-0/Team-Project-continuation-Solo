"use client"

import TiltedCard from "@/blocks/Components/TiltedCard/TiltedCard";
import { EmployeeCardProps } from "./_OrderPageTypes/types";
const EmployeeCard = ({ ner, mergejil, zurag, captionText }: EmployeeCardProps) => {

    return (
        <span className="w-10 h-20">
            <TiltedCard
                containerClassName="w-full  flex flex-col items-center justify-center"
                imageSrc={zurag}
                captionText={captionText}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight=""
                imageWidth=""
                rotateAmplitude={12}
                scaleOnHover={1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
            />
            <span className="flex flex-col gap-2 w-full items-center justify-center">
                <span className="text-sm text-black ">{ner}</span><span className="text-sm text-gray-500">{mergejil}</span>
            </span>
        </span>
    );
}
export default EmployeeCard