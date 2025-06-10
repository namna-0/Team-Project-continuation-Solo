"use client"

import { ArrowLeftIcon, LucideArrowLeft, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import LeaveOrder from "./leaveOrderDialog"
import { motion, useScroll, useTransform } from "framer-motion";
type OrderNavpropsType = { isStage: string, setIsStage: (stage: string) => void, title: string, Stages: string[] }
const OrderNavBar = ({ isStage, setIsStage, Stages, title }: OrderNavpropsType) => {

    const initialValue = 107;
    const finalValue = 88;
    const thresholdY = 29; // set the scroll position where you want the state change
    const speed = 1;
    const scrollDistance = (initialValue - finalValue) / speed;
    const startY = 0; // scroll position when transition starts
    const endY = startY + scrollDistance;
    const { scrollY } = useScroll();
    const scrollOutput = useTransform(
        scrollY,
        [startY, endY, endY],
        [initialValue, finalValue, finalValue],
        {
            clamp: false
        }
    );
    const [isPastThreshold, setIsPastThreshold] = useState(false);
    useEffect(
        () => scrollY.onChange((latest) => setIsPastThreshold(latest > thresholdY)),
        []
    );

    const HandleNextStage = () => {
        if (isStage == Stages[0]) (
            setIsStage(Stages[1])
        )
        if (isStage == Stages[1]) { setIsStage(Stages[2]) }
    };
    const HandlePrevStage = () => {

        if (isStage == Stages[1]) { setIsStage(Stages[0]) }
        if (isStage == Stages[2]) { setIsStage(Stages[1]) }
    }
    return (
        <>
            <div className="flex w-screen h-fit p-4  bg-white z-10 fixed top-0 left-0 ">
                <div className="w-full flex justify-between items-center ">
                    <div className="flex gap-6">
                        {isStage == Stages[0] ? (
                            <Dialog  >
                                <DialogTrigger>
                                    <LucideArrowLeft /></DialogTrigger>
                                <LeaveOrder />
                            </Dialog>) :
                            <div onClick={() => {
                                { HandlePrevStage() }
                            }
                            }><LucideArrowLeft />
                            </div>
                        }
                        <motion.div
                            className="font-bold text-3xl normal-case "
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: isPastThreshold ? 1 : 0,
                                scale: isPastThreshold ? 1 : 0.5
                            }}
                        >
                            {title}
                        </motion.div>

                    </div>
                    <div> <Dialog>
                        <DialogTrigger>
                            <X /></DialogTrigger>
                        <LeaveOrder />
                    </Dialog></div>
                </div>
            </div></>
    )
}
export default OrderNavBar

