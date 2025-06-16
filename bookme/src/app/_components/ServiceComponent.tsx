"use client";

import React, { useEffect, useRef, useState } from "react";

// Mock GSAP functionality for the artifact environment
const gsap = {
  context: (callback: () => void, ref: any) => {
    callback();
    return { revert: () => {} };
  },
  utils: {
    toArray: (selector: string) =>
      Array.from(document.querySelectorAll(selector)),
  },
  to: (target: any, vars: any) => {},
  timeline: (vars?: any) => ({
    to: (target: any, vars: any, position?: any) => ({ to: () => {} }),
    fromTo: (target: any, from: any, to: any, position?: any) => ({
      fromTo: () => {},
    }),
  }),
};

const ScrollTrigger = {
  create: (vars: any) => ({ kill: () => {} }),
  registerPlugin: () => {},
};

const serviceData = [
  {
    id: "bookme",
    title: "Bookme Business",
    text: "Захиалгыг бүртгэлгүй хүлээн авах боломжтой. Хэрэглэгчид таны үйлчилгээг хялбар захиалах боломжтой.",
    image:
      "https://res.cloudinary.com/dpbmpprw5/image/upload/v1749889984/path-digital-tR0jvlsmCuQ-unsplash_1_jps41f.jpg",
    color: "from-blue-600 to-indigo-600",
    backgroundColor: "from-blue-600/20 to-indigo-600/10",
  },
  {
    id: "payment",
    title: "Online Payment",
    text: "Stripe, QPay зэрэг төлбөрийн шийдэлтэй. Аюулгүй, хурдан төлбөрийн систем.",
    image:
      "https://images.unsplash.com/photo-1610076228127-df0282bb6c93?auto=format&fit=crop&w=870&q=80",
    color: "from-green-600 to-teal-600",
    backgroundColor: "from-green-600/20 to-teal-600/10",
  },
  {
    id: "nochat",
    title: "No Chat Needed",
    text: "Нэг ч чат бичихгүйгээр хэрэглэгч захиалга өгч чадна. Автомат системээр бүх үйл явц.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=870&q=80",
    color: "from-orange-600 to-red-600",
    backgroundColor: "from-orange-600/20 to-red-600/10",
  },
  {
    id: "analytics",
    title: "Smart Analytics",
    text: "Дэлгэрэнгүй тайлан, статистик мэдээлэл. Бизнесийн шийдвэр гаргахад туслах ухаалаг системтэй.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=870&q=80",
    color: "from-purple-600 to-pink-600",
    backgroundColor: "from-purple-600/20 to-pink-600/10",
  },
];

export const ServiceComponent = ({
  service,
  isActive,
  index,
}: {
  service: (typeof serviceData)[0];
  isActive: boolean;
  index: number;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-60 translate-y-8"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-2 h-16 bg-gradient-to-b ${
                  service.color
                } rounded-full flex-shrink-0 mt-2 transition-all duration-700 ${
                  isActive ? "scale-y-100" : "scale-y-50"
                }`}
              />
              <div className="min-w-0">
                <span className="text-sm uppercase tracking-wider text-white/60 block mb-2">
                  Service {index + 1}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
                  {service.title}
                </h2>
              </div>
            </div>

            <p className="text-lg lg:text-xl leading-relaxed text-white/90">
              {service.text}
            </p>

            <button
              className={`px-8 py-4 bg-gradient-to-r ${service.color} text-white rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg font-semibold hover:shadow-2xl`}
              aria-label={`Learn more about ${service.title}`}
            >
              Дэлгэрэнгүй
            </button>
          </div>

          {/* Image Content */}
          <div
            className={`relative group transition-all duration-1000 ${
              isActive ? "opacity-100 scale-100" : "opacity-70 scale-95"
            }`}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                service.color
              } rounded-3xl blur-2xl transition-all duration-700 ${
                isActive ? "opacity-40 scale-110" : "opacity-20 scale-95"
              }`}
            />

            {/* Main image */}
            <img
              src={service.image}
              alt={service.title}
              className={`relative w-full h-[400px] lg:h-[500px] rounded-3xl object-cover shadow-2xl border transition-all duration-700 ${
                isActive ? "border-white/30 border-2" : "border-white/10 border"
              }`}
              loading="lazy"
            />

            {/* Service indicator */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient for active service */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          service.backgroundColor
        } transition-opacity duration-1000 ${
          isActive ? "opacity-10" : "opacity-0"
        }`}
      />
    </div>
  );
};
