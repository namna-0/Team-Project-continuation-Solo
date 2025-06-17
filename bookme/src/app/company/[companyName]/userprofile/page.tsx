"use client";
import Link from "next/link";
import { HomeAddress } from "./_components/Homeaddress";
import { WorkAddress } from "./_components/Workaddress";
import { useAuth } from "@/app/_providers/UserAuthProvider";
import { Button } from "@/components/ui/button";
import { Editprofile } from "./_components/Editprofile";
import { Navbar } from "./_components/Navbar";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="w-screen h-screen bg-[#f9f9f9] flex flex-col items-center">
      <Navbar />
      <div className="w-[1440px] h-fit flex items-center justify-center mt-20">
        <div className="w-[960px] h-[770px] flex flex-col gap-10">
          <div className="w-full h-[36px]">
            <p className="font-bold text-[36px]">Хэрэглэгчийн нүүр хуудас</p>
          </div>
          <div className="w-full h-[695px] flex gap-5">
            <div className="w-[360px] h-full bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
              <div className="w-full h-[150px] flex flex-col gap-10 border-b-1">
                <div className="w-full h-[16px] flex justify-end">
                  <Editprofile />
                </div>
                <div className="w-full h-[30px] flex justify-center items-center">
                  <p className="font-bold text-[25px]">{user?.username}</p>
                </div>
              </div>

              <div className="w-full h-fit ">
                <div className="w-full h-[360px] flex flex-col gap-5 pt-2">
                  <div>
                    <p className="font-semibold text-[16px]">Емайл</p>

                    <p className="text-[14px] text-gray-400">{user?.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Утасны дугаар</p>

                    <p className="text-[14px] text-gray-400">
                      {user?.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Гэрийн хаяг</p>
                    <p className="text-[14px] text-gray-400">{user?.address}</p>
                  </div>
                </div>
              </div>
              <Link href="/company/test-company/appointments">
                <Button className="w-full cursor-pointer">
                  Захиалгын түүх харах
                </Button>
              </Link>
            </div>
            <div className="w-[580px] h-full bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
              <div className="w-full h-[24px] ">
                <p className="text-[24px] font-bold">Миний хаяг</p>
              </div>
              <HomeAddress />
              {/* <WorkAddress /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
