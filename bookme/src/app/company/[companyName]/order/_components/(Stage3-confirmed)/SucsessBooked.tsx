"use client"

import { LucideShoppingCart, ShoppingBag, ShoppingBasket } from "lucide-react"

type BookedSucsessProps = {}
export default function BookedSucsess() {

    return (
        <div className="flex  flex-col w-full h-[80%]  gap-10 justify-between items-center">
            <div className="w-full flex flex-col gap-5"><h1 className="text-4xl"> төлбөрийн нөхцөл </h1>
                <div className="w-full h-20 border border-gray-500 rounded-2xl text-2xl">
                    </div></div>
            <div className="flex-3 w-full h-full flex flex-col gap-5"><h1 className="text-4xl"> нэмэлт мэдээлэл</h1>
                < textarea placeholder="захиалгад хавсаргах нэмэлт мэдээлэл байвал бичнэ үү..." className="w-full h-full border placeholder-gray-300  p-6 items-start justify-center border-gray-500 rounded-2xl text-2xl">
                </textarea>
            </div>
        </div >
    )
}