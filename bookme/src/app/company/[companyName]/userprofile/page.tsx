"use client";
import Link from "next/link";
import { HomeAddress } from "./_components/Homeaddress";
import { WorkAddress } from "./_components/Workaddress";
import { useEffect, useState } from "react";
import { useAuth, User } from "@/app/_providers/UserAuthProvider";

export default function Home() {
  const { user } = useAuth();
  const [isEditting, setIsEditting] = useState(false);
  const [userData, setUserData] = useState<Partial<User | undefined>>({});

  useEffect(() => {
    if (user && isEditting) {
      setUserData(user);
    }
  }, [user, isEditting]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

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
      <div className="w-[1440px] h-fit   flex items-center justify-center">
        <div className="w-[960px] h-[770px] flex flex-col gap-10">
          <div className="w-full h-[36px]">
            <p className="font-bold text-[36px]">Хэрэглэгчийн нүүр хуудас</p>
          </div>
          <div className="w-full h-[695px] flex gap-5">
            <div className="w-[360px] h-full bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
              <div className="w-full h-[150px] flex flex-col gap-10 border-b-1">
                <div className="w-full h-[16px] flex justify-end">
                  <p
                    className="text-purple-400 text-[16px] font-medium cursor-pointer hover:underline"
                    onClick={() => setIsEditting(!isEditting)}
                  >
                    {isEditting ? "Хадгалах" : "Засах"}
                  </p>
                </div>
                <div className="w-full h-[30px] flex justify-center items-center">
                  <p className="font-bold text-[25px]">{user?.username}</p>
                </div>
              </div>

              <div className="w-full h-fit ">
                <div className="w-full h-[360px] flex flex-col gap-5 pt-2">
                  <div>
                    <p className="font-semibold text-[16px]">Емайл</p>
                    {isEditting ? (
                      <input
                        name="email"
                        value={userData.email || ""}
                        onChange={handleInputChange}
                        className="text-[14px] border-b-2 border-gray-300 focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-[14px] text-gray-400">{user?.email}</p>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Утасны дугаар</p>
                    {isEditting ? (
                      <input
                        name="phoneNumber"
                        value={userData.phoneNumber || ""}
                        onChange={handleInputChange}
                        className="text-[14px] border-b-2 border-gray-300 focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-[14px] text-gray-400">
                        {user?.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Хаяг</p>
                    {isEditting ? (
                      <input
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="text-[14px] border-b-2 border-gray-300 focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-[14px] text-gray-400">
                        {user?.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[580px] h-full bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
              <div className="w-full h-[24px] ">
                <p className="text-[24px] font-bold">Миний хаяг</p>
              </div>
              <HomeAddress />
              <WorkAddress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
