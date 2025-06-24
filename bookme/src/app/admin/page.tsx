import { Building2, HouseIcon } from "lucide-react";
import Image from "next/image";
import { AdminHome } from "./components/Adminhome";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#e1e1e1] p-5 flex justify-center ">
      <div className="w-[1440px] h-fit flex gap-[50px]">
        <div className=" w-[200px]  bg-white rounded-2xl shadow-2xl  flex flex-col gap-[70px]">
          <div className="flex gap-[10px] items-center w-full p-5">
            <Image
              src="/default-logo.jpg"
              alt="Company Logo"
              width={40}
              height={40}
            />
            <p className="font-bold text-[22px]">
              <span className="text-blue-400">Book</span>me
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full p-5">
            <button className="relative flex  group w-[160px] h-10 px-6 py-2 rounded-[8px] cursor-pointer hover:text-white">
              <span className="absolute inset-0 bg-gradient-to-r from-[#77b8fa] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-[8px]" />
              <span className="relative z-10 flex gap-3 text-black ">
                <HouseIcon />
                Home
              </span>
            </button>
            <button className="relative flex  group w-[160px] h-10 px-6 py-2 rounded-[8px] cursor-pointer hover:text-white">
              <span className="absolute inset-0 bg-gradient-to-r from-[#77b8fa] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-[8px]" />
              <span className="relative z-10 flex gap-3 text-black ">
                <Building2 />
                Companies
              </span>
            </button>
          </div>
          <div className="w-full h-[200px]  border border-t-gray-200 rounded-[8px]"></div>
        </div>
        <AdminHome />
      </div>
    </div>
  );
}
