import { Button } from "@/components/ui/button";
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
      <div className="w-[1440px] h-fit   flex items-center justify-center">
        <div className="w-[960px] h-[770px] flex flex-col gap-10">
          <div className="w-full h-[36px]">
            <p className="font-bold text-[36px]">Тохиргоо</p>
          </div>
          <div className="w-[530px] h-[200px] bg-white rounded-2xl border border-gray-300 p-10 flex flex-col gap-10">
            <div>
              <p className="font-bold text-[25px]">Хэрэглэгч устгах</p>
              <p className="text-[14px] text-gray-400">
                Bookme-г орхихдоо та итгэлтэй байна уу?
              </p>
            </div>
            <Button className="w-[200px] border border-gray-500 text-red-500 font-semibold cursor-pointer">
              Delete my account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
