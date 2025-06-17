"use client";
import { useAuth } from "@/app/_providers/UserAuthProvider";
import { api } from "@/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderType = {
  _id: string;
  selectedTime: string;
  status: "confirmed" | "cancelled" | string;
  company: {
    _id: string;
    companyName: string;
    companyImages: string[];
    address: string;
  };
  employee: {
    _id: string;
    employeeName: string;
  };
};

export default function Home() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isClicked, setisClicked] = useState<OrderType | null>(null);
  const { user } = useAuth();

  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  );
  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed"
  );

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/order/user/${user._id}`);
        setOrders(response.data.bookings);
        console.log("hahhaha", response.data.bookings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="w-screen h-screen bg-[#f9f9f9] flex  items-center flex-col gap-[60px]">
      <nav className=" top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm relative">
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
      <div className="w-[1440px] h-fit flex flex-col items-center justify-center gap-[60px] p-5">
        <div className="w-full h-[36px]">
          <p className="font-bold text-[36px]">Захиалгын түүх</p>
        </div>
        <div className="flex w-full h-fit gap-10 justify-between ">
          <div className="w-fit h-fit flex flex-col gap-5">
            <div className="w-fit">
              <p className="text-[24px] font-semibold flex items-center gap-2">
                Батлгаажсан цагууд{" "}
                <span className="w-6 h-6 flex items-center justify-center text-[14px] text-white bg-blue-600 rounded-full">
                  {confirmedOrders.length}
                </span>
              </p>
              <div className="flex flex-col gap-4 mt-[10px]">
                {confirmedOrders.map((order, index) => (
                  <div
                    onClick={() => setisClicked(order)}
                    key={index}
                    className="w-[400px] h-[120px] bg-white border border-gray-400 rounded-[12px] flex cursor-pointer gap-4"
                  >
                    <img
                      src={order.company.companyImages?.[0]}
                      className="w-[130px] h-full rounded-l-[12px] "
                    />
                    <div className="w-[250px] h-full flex flex-col justify-center">
                      <p className="font-semibold">
                        {order.company.companyName}
                      </p>
                      <p className="text-[12px]">{order.selectedTime}</p>
                      <p className="text-[12px]">
                        {order.employee.employeeName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-fit">
              <p className="text-[24px] font-semibold flex items-center gap-2">
                Цуцлагдсан цагууд{" "}
                <span className="w-6 h-6 flex items-center justify-center text-[14px] text-white bg-blue-600 rounded-full">
                  {cancelledOrders.length}
                </span>
              </p>
              <div className="flex flex-col gap-4 mt-[10px]">
                {cancelledOrders.map((mock, index) => (
                  <div
                    onClick={() => setisClicked(mock)}
                    key={index}
                    className="w-[400px] h-[120px] bg-white border border-gray-400 rounded-[12px] flex cursor-pointer gap-4"
                  >
                    <img
                      src={mock.company.companyImages[1]}
                      className="w-[130px] h-full rounded-l-[12px] "
                    />
                    <div className="w-[250px] h-full flex flex-col justify-center">
                      <p className="font-semibold">
                        {mock.company.companyName}
                      </p>
                      <p className="text-[14px]">{mock.selectedTime}</p>
                      <p className="text-[12px]">
                        {mock.employee.employeeName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[900px] h-fit bg-white border border-gray-300 rounded-[12px] p-6">
            {isClicked ? (
              <div className="flex flex-col gap-4">
                <img
                  src={isClicked.company.companyImages[1]}
                  className="w-full h-[400px] object-cover rounded-[8px]"
                />
                <h2 className="text-2xl font-bold">
                  {isClicked.company.companyName}
                </h2>
                <p className="text-lg text-gray-700">📅 2025-06-17</p>
                <p className="text-lg text-gray-700">⏰ 14:00</p>
                <p className="text-ls text-gray-700">
                  🧑‍💼{isClicked.employee.employeeName}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
                  onClick={() => setisClicked(null)}
                >
                  Хаах
                </button>
              </div>
            ) : (
              <p className="text-gray-500 ">Харах цагаа дарна уу ...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
