"use client"
import { useState } from "react";
import TiltedCard from "@/blocks/Components/TiltedCard/TiltedCard";
import ShinyText from "@/blocks/TextAnimations/ShinyText/ShinyText";
type EmployeeCardProps = { ner: string, mergejil: string, zurag: string, captionText: string }
const EmployeeCard = ({ ner, mergejil, zurag, captionText }: EmployeeCardProps) => {
    return (
        <span>
            <TiltedCard
                imageSrc={zurag}
                captionText={captionText}
                containerHeight="100"
                containerWidth="100"
                imageHeight="100px"
                imageWidth=""
                rotateAmplitude={25}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
            />
            <span className="flex flex-col gap2">
                <span className="text-lg text-black">{ner}</span><span>{mergejil}</span>
            </span>
        </span>
    );
}
export default EmployeeCard