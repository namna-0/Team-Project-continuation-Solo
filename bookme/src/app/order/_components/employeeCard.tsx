"use client"
import { useState } from "react";
import ProfileCard from "./ProfileCard/ProfileCard";
type EmployeeCardProps = { ner: string, mergejil: string, zurag: string }
const EmployeeCard = ({ ner, mergejil, zurag }: EmployeeCardProps) => {
    return (
        <div>
            <ProfileCard
                className="w-65 max-h-80 gap-3 flex  flex-col   "
                name={ner}
                title={mergejil}
                handle={ner}
                status={""}
                contactText="book now"
                showBehindGradient={true}
                avatarUrl={zurag}
                showUserInfo={false}
                enableTilt={true}
                onContactClick={() => console.log('Contact clicked')}
            />
        </div >
    );
}
export default EmployeeCard