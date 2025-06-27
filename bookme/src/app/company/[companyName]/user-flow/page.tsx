"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const companyName = params?.companyName as string;
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-radial-[at_50%_75%] from-indigo-900 via-blue-400 to-sky-200 to-90% text-white">
      <div className="w-[1440px] h-fit flex  rounded-[23px] justify-center items-center shadow-xl ">
        <div className="w-[50%] h-full flex justify-center items-center ">
          <div className="w-[404px] h-[638px] flex flex-col gap-[10px] ">
            <Link href={`/company/${companyName}`}>
              <Button className="w-[40px] h-[40px] cursor-pointer bg-white text-black hover:text-white">
                <ArrowBigLeft />
              </Button>
            </Link>
            <div className="w-fit h-[53px]">
              <p className="font-semibold text-[32px] ">Бүртгүүлэх</p>
            </div>
            <Link href="/signin">
              <button className="w-full h-[200px] border border-black rounded-2xl p-5 cursor-pointer">
                <p className="font-medium text-[26px]">Компаниар нэвтрэх</p>
              </button>
            </Link>
            <Link href={`/company/${companyName}/login`}>
              <button className="w-full h-[200px] border border-black rounded-2xl p-5 cursor-pointer">
                <p className="font-medium text-[26px]">Хэрэглэгчээр нэвтрэх</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[50%] h-full ">
          <img
            src="https://res.cloudinary.com/dqd01lbfy/image/upload/v1751008273/pain_oxdu59.jpg"
            className="w-[720px] h-[1000px] rounded-2xl"
          ></img>
        </div>
      </div>
    </div>
  );
}
