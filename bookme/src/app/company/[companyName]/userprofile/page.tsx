import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HouseIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#f9f9f9] flex justify-center items-center flex-col">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
              >
                Nailsy
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="#home"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#services"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#about"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <Link
                href="#book"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                User
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-[1440px] h-fit border border-black flex items-center justify-center">
        <div className="w-[960px] h-[770px] flex flex-col gap-10">
          <div className="w-full h-[36px]">
            <p className="font-bold text-[36px]">Profile</p>
          </div>
          <div className="w-full h-[695px] flex gap-5">
            <div className="w-[360px] h-full bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
              <div className="w-full h-[150px] flex flex-col gap-10 border-b-1">
                <div className="w-full h-[16px] flex justify-end">
                  <p className="text-purple-400 text-[16px] font-medium">
                    Edit
                  </p>
                </div>
                <div className="w-full h-[30px] flex justify-center items-center">
                  <p className="font-bold text-[25px]">Username</p>
                </div>
              </div>

              <div className="w-full h-fit ">
                <div className="w-full h-[360px] flex flex-col gap-5 pt-2">
                  <div>
                    <p className="font-semibold text-[16px]">Email</p>
                    <p className=" text-[14px] text-gray-400">
                      bbayargun@gmail.com
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Mobile number</p>
                    <p className="text-[14px] text-gray-400">218731490812</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Address</p>
                    <p className="text-[14px] text-gray-400">tend end </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[580px] h-full bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
              <div className="w-full h-[24px] ">
                <p className="text-[24px] font-bold">My address</p>
              </div>
              <div className="w-full h-fit flex flex-col gap-[14px]">
                <Dialog>
                  <DialogTrigger className="cursor-pointer w-full h-[72px] border border-gray-300 rounded-[6px] hover:bg-[#fbfafa] ">
                    <div className="w-full h-full flex items-center px-10 gap-[20px]">
                      <div className="h-[50px] w-[50px] bg-[#e8e7e7] rounded-[9999px] flex justify-center items-center">
                        <HouseIcon />
                      </div>
                      <div className="w-[130px] flex flex-col ">
                        <p className="font-bold text-[16px]">Home</p>
                        <p className="text-[14px] text-gray-400">
                          Add a home address
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
