"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ImageSVG } from "./assets/ImageSVG"
import { EmployeeForm } from "./EmployeeForm"

export const AddEmployee = () => {
    const [open, setOpen] = useState(false)
    const [uploadedImage, setUploadedImage] = useState("");
    const 

    const handleAddEmployee = () => {

    }

    console.log(open);

    //   employeeName: { type: String, required: true, default: "" },
    //   description: { type: String, default: "" },
    //   profileImage: { type: String },
    //   availability: { type: Boolean },
    //   duration: { type: String, required: true },
    //   workingHours: { type: String, default: "08:00-18:00" },


    return (
        <div className="w-[1440px] bg-white rounded-2xl">
            <div className="flex justify-between items-center p-4">
                <div>
                    <div className="text-[20px] font-medium">
                        Organization Management
                    </div>
                    <div className="text-[14px] font-normal text-gray-400">
                        Manage your business profile and team
                    </div>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <form>
                        <DialogTrigger asChild>
                            <Button >+ Add employee</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Upload avatar</DialogTitle>

                            </DialogHeader>
                            <EmployeeForm />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
        </div>)
}