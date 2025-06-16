"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ProfileCard from "@/blocks/Components/ProfileCard/ProfileCard";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/axios";
import Image from "next/image";
import ScrollFloat from "@/blocks/TextAnimations/ScrollFloat/ScrollFloat";

interface Employee {
  _id: string;
  employeeName: string;
  description: string;
  profileImage: string;
}

interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface Company {
  _id: string;
  companyName: string;
  description: string;
  address: string;
  city: string;
  phoneNumber: string;
  email: string;
  companyLogo: string;
  companyImages: string[];
  workingHours: WorkingHours;
  employees: Employee[];
}

const dayLabels: Record<string, string> = {
  monday: "Даваа",
  tuesday: "Мягмар",
  wednesday: "Лхагва",
  thursday: "Пүрэв",
  friday: "Баасан",
  saturday: "Бямба",
  sunday: "Ням",
};

export default function CompanyHomepage() {
  const { companyName } = useParams<{ companyName: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = () => {
    console.log("Subscribed:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/company/${companyName}`);
        if (response.data && response.data.company) {
          setCompany(response.data.company);
        } else {
          setError("Компани олдсонгүй");
        }
      } catch (err) {
        console.error("Компаний мэдээлэл авахад алдаа гарлаа:", err);
        setError("Компаний мэдээлэл авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    if (companyName) {
      fetchCompany();
    }
  }, [companyName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Анхаар!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Дахин оролдох
        </Button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Компаний мэдээлэл олдсонгүй</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-rose-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-300/30 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg transform scale-98"
            : "bg-white/80 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="relative w-32 h-10">
                  {" "}
                  <Image
                    src={company.companyLogo}
                    alt="Company Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Home", "Services", "About", "Contact"].map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-pink-500 transition-all duration-300 relative group px-3 py-2 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 relative overflow-hidden group">
                <span className="relative z-10">Нэвтрэх</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-pink-500 transition-all duration-300 relative z-50"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen
                        ? "rotate-45 translate-y-0.5"
                        : "-translate-y-1"
                    }`}
                  ></span>
                  <span
                    className={`w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen
                        ? "-rotate-45 -translate-y-0.5"
                        : "translate-y-1"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMenu}
          ></div>

          <div
            className={`absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 pt-20">
              <div className="space-y-4">
                {["Home", "Services", "About", "Contact"].map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className={`block px-4 py-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                      isMenuOpen ? "animate-slideInRight" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <button
                onClick={toggleMenu}
                className={`w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${
                  isMenuOpen ? "animate-slideInRight" : ""
                }`}
                style={{ animationDelay: "400ms" }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen"
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

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.img
                src={company.companyImages[1]}
                alt="Bertie Capone"
                className="rounded-2xl shadow-2xl w-full h-auto"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl -z-10"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <p className="text-rose-600 font-medium tracking-wider uppercase mb-4">
                  Бидний тухай
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {company.companyName}
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>{company.description}</p>
                <p> Манай хаяг: {company.address}</p>
                <p>📞 Холбоо барих: {company.phoneNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-white/70 rounded-2xl shadow">
                  <div className="text-2xl font-bold text-rose-600 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600">жилийн туршлага</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-2xl shadow">
                  <div className="text-2xl font-bold text-rose-600 mb-2">
                    Celebrity
                  </div>
                  <div className="text-gray-600">Approved</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {company.workingHours && (
        <section className="py-20 bg-white">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            {Object.entries(company.workingHours).map(([day, hours], idx) => (
              <div key={day} data-index={idx}>
                <h3 className="font-bold text-gray-700">{dayLabels[day]}</h3>
                <p className="text-gray-600">
                  {hours.closed
                    ? "Хаалттай"
                    : `Нээлт: ${hours.open} - Хаалт: ${hours.close}`}
                  asddas
                </p>
              </div>
            ))}
          </ScrollFloat>
        </section>
      )}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-6">
              Бидний хамт олон
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Манай мэргэжлийн баг танд төгс үйлчилгээг үзүүлэхэд бэлэн байна.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {company.employees.map((member) => (
              <ProfileCard
                key={member._id}
                name={member.employeeName}
                title={member.description}
                handle={member.employeeName.toLowerCase().replace(/\s/g, "")}
                status="Online"
                contactText="Цаг захиалах"
                avatarUrl={member.profileImage}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() =>
                  console.log(`${member.employeeName} руу холбогдлоо`)
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="photos" className="bg-white py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Бидний зураг
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Сүүлийн үеийн бүтээл болон манай орчин
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {company.companyImages.slice(0, 6).map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <div className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform">
                <img
                  className="w-full h-[350px] object-cover"
                  src={imageUrl}
                  alt={`Image ${idx + 1}`}
                />
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 h-[450px]">
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
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
