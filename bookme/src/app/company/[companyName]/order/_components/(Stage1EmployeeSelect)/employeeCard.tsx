"use client"
import { useState } from "react";
import TiltedCard from "@/blocks/Components/TiltedCard/TiltedCard";
import ShinyText from "@/blocks/TextAnimations/ShinyText/ShinyText";
type EmployeeCardProps = { ner: string, mergejil: string, zurag: string, captionText: string }
const EmployeeCard = ({ ner, mergejil, zurag, captionText }: EmployeeCardProps) => {
    return (
        <span >
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