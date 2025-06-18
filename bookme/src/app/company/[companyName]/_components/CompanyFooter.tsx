"use client";
import { Instagram, Facebook, Twitter, Heart } from "lucide-react";

type CompanyFooterProps = {
  companyName: string;
};
export const CompanyFooter = ({ companyName }: CompanyFooterProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 pt-[100px]">
          {companyName}
        </div>
        <p className="text-gray-400 mb-8">Олон хэрэглэгчээр сайшаагдсан.</p>
        <div className="flex justify-center space-x-6">
          {[Instagram, Facebook, Twitter].map((Icon, index) => (
            <Icon
              key={index}
              className="text-gray-400 hover:text-pink-400 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              size={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
