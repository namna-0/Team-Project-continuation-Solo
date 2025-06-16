"use client"
import { useState } from "react";
import TiltedCard from "@/blocks/Components/TiltedCard/TiltedCard";
import ShinyText from "@/blocks/TextAnimations/ShinyText/ShinyText";
type EmployeeCardProps = { ner: string, mergejil: string, zurag: string, captionText: string }
const EmployeeCard = ({ ner, mergejil, zurag, captionText }: EmployeeCardProps) => {
    return (
        <TiltedCard
            imageSrc={zurag}
            captionText={captionText}
            containerHeight="200px"
            containerWidth="200px"
            imageHeight="200px"
            imageWidth="200px"
            rotateAmplitude={25}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
                <div className=" flex flex-col gap-1">
                    <p>{ner}</p>
                    {mergejil}
                </div>
            }
        />

    );
}
export default EmployeeCard