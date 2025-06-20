"use client"
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider"
import { api } from "@/axios"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ImageSVG } from "./assets/ImageSVG"
import { toast } from "sonner"
type Props = {
    image: string
    index: number
    newImage: File | null
}
export const CompanyImageCard = ({ image, index, newImage }: Props) => {

    return (
        <div className="w-full h-full relative">
            {newImage ? (
                <img
                    src={URL.createObjectURL(newImage)}
                    className="w-full h-full rounded-3xl bg-amber-500"
                />
            ) : (
                <img src={image} className="w-full h-full rounded-3xl" />
            )}
            <div className="absolute right-2 bottom-2">
                <Button variant={"outline"}>Хадгалах</Button>
            </div>
            <Button
                variant={"outline"}
                className="rounded-full absolute left-2 top-2 opacity-75 hover:bg-black hover:text-white"
                disabled
            >
                x
            </Button>
        </div>
    )
}   