" use client";

import { Calendar, ChevronDown, Heart, Sparkles, Star } from "lucide-react";
import { Company } from "./CompanyTypes";
import { useEffect, useState } from "react";

export const CompanyBackgroundTemplate2 = ({
  companyName,
  company,
}: {
  companyName: string;
  company: Company;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Image carousel if multiple images
    if (company.companyImages && company.companyImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === company.companyImages.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [company.companyImages]);

  console.log("hour", company.workingHours.monday);
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
          src={company.backGroundImage}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold tracking-wider uppercase text-sm">
                  онлайн цаг захиалга
                </span>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-grey-500 rounded-full animate-pulse"></div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1
                  className={`text-6xl md:text-7xl lg:text-8xl font-bold leading-tight transition-all duration-1000 delay-200 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                >
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    {companyName}
                  </span>
                  <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-white-500 to-black-500 bg-clip-text text-transparent mt-2">
                    компанийн хуудас
                  </span>
                </h1>
              </div>

              <p
                className={`text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Өндөр зэрэглэлийн мэргэжлийн үйлчилгээ,
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text font-semibold">
                  таны цагийг хэмнэх ухаалаг бизнес
                </span>
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-6 pt-4 transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Primary CTA */}
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-black-600 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/25">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <Heart className="w-6 h-6 group-hover:animate-pulse" />
                    Цаг захиалах
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - Floating Elements */}
            <div className="relative hidden lg:block">
              {/* Main Floating Card */}
              <div
                className={`relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-1000 delay-1000 ${
                  isVisible
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-12 rotate-6"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Онлайн захиалга
                      </h3>
                      <p className="text-gray-300">24/7 боломжтой</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/10 rounded-xl text-center">
                      <div className="text-2xl font-bold text-white">
                        {company.workingHours.monday.open}
                      </div>
                      <div className="text-gray-300 text-sm">Нээлт</div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-xl text-center">
                      <div className="text-2xl font-bold text-white">
                        {company.workingHours.monday.close}
                      </div>
                      <div className="text-gray-300 text-sm">Хаалт</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/70 text-sm font-medium">
            Доош скролл хийх
          </span>
          <ChevronDown className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};
