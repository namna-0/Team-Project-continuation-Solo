" use client";

import { Heart } from "lucide-react";
import { Company } from "./CompanyTypes";

export const CompanyBackgroundImageText = ({
  companyName,
  company,
}: {
  companyName: string;
  company: Company;
}) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[800px]"
      style={{
        backgroundImage: company.companyImages?.length
          ? `url('${company.companyImages[0]}')`
          : "url('https://res.cloudinary.com/dxhmgs7wt/image/upload/v1749803046/heroback_wzxjtk.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 mt-[300px]">
              <p
                className="text-white font-medium tracking-wider uppercase animate-fadeInUp opacity-0"
                style={{
                  animationDelay: "200ms",
                  animationFillMode: "forwards",
                }}
              >
                Premium Hair Salon
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span
                  className="inline-block animate-fadeInUp opacity-0"
                  style={{
                    animationDelay: "400ms",
                    animationFillMode: "forwards",
                  }}
                >
                  {companyName}
                </span>
                <span
                  className="block bg-gradient-to-r from-white to-purple-600 bg-clip-text text-transparent animate-fadeInUp opacity-0"
                  style={{
                    animationDelay: "600ms",
                    animationFillMode: "forwards",
                  }}
                ></span>
              </h1>
              <p
                className="text-xl text-white leading-relaxed animate-fadeInUp opacity-0"
                style={{
                  animationDelay: "800ms",
                  animationFillMode: "forwards",
                }}
              >
                Өндөр зэрэглэлийн салон
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fadeInUp opacity-0"
              style={{
                animationDelay: "1000ms",
                animationFillMode: "forwards",
              }}
            >
              <button className="bg-gradient-to-r from-white-500 to-pink-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 text-center font-semibold relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Цаг захиалах
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              {[
                { number: "500+", label: "Happy Clients" },
                { number: "5★", label: "Rating" },
                { number: "3+", label: "Years" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fadeInUp opacity-0"
                  style={{
                    animationDelay: `${1200 + index * 200}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="text-3xl font-bold text-gray-900 hover:text-pink-500 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
