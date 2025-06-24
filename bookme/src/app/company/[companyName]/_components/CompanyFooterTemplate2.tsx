"use client";
import { Instagram, Facebook, Twitter, Heart } from "lucide-react";

type CompanyFooterProps = {
  companyName: string;
};
export const CompanyFooterTemplate2 = ({ companyName }: CompanyFooterProps) => {
  return (
    <section className="w-full relative py-20 overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {companyName}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Олон хэрэглэгчээр сайшаагдсан, найдвартай үйлчилгээ
          </p>

          <div className="flex justify-center space-x-8">
            {[
              {
                Icon: Instagram,
                color: "from-pink-500 to-rose-500",
                hover: "hover:from-pink-400 hover:to-rose-400",
              },
              {
                Icon: Facebook,
                color: "from-blue-500 to-blue-600",
                hover: "hover:from-blue-400 hover:to-blue-500",
              },
              {
                Icon: Twitter,
                color: "from-cyan-500 to-blue-500",
                hover: "hover:from-cyan-400 hover:to-blue-400",
              },
            ].map(({ Icon, color, hover }, index) => (
              <div
                key={index}
                className={`group relative p-4 bg-gradient-to-r ${color} rounded-2xl shadow-lg ${hover} transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 cursor-pointer`}
              >
                <Icon className="text-white" size={28} />
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              © 2024 {companyName}. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
