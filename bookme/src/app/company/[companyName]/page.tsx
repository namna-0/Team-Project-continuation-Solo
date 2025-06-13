"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Heart,
} from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { motion } from "framer-motion";
import ProfileCard from "@/blocks/Components/ProfileCard/ProfileCard";
 
interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}
 
interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}
 
const services: Service[] = [
  {
    id: 1,
    name: "Classic Manicure",
    description: "Traditional nail care with cuticle treatment, nail shaping, and polish application.",
    price: "$45",
    duration: "45 min",
    image: "/Images/side-view-woman-with-beautiful-hair",
  },
  {
    id: 2,
    name: "Gel Manicure",
    description: "Long-lasting gel polish application with professional UV curing.",
    price: "$65",
    duration: "60 min",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    name: "Express Manicure",
    description: "For women on the move. Quick nail shaping with GEMINI Nourishing Nail Polish application.",
    price: "$35",
    duration: "30 min",
    image: "/api/placeholder/300/200",
  },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Зулаа",
    position: "Lead Nail Artist",
    bio: "10+ years of experience in luxury nail design and care.",
    image: "https://res.cloudinary.com/dxhmgs7wt/image/upload/v1748578916/jrjgmunctd2whx6vukpy.webp",
  },
  {
    id: 2,
    name: "Ганаа",
    position: "Senior Stylist",
    bio: "Specializes in intricate nail art and extensions.",
    image: "https://res.cloudinary.com/dxhmgs7wt/image/upload/v1748578916/jrjgmunctd2whx6vukpy.webp",
  },
  {
    id: 3,
    name: "Батаа",
    position: "Spa Director",
    bio: "Ensures every client receives premium service experience.",
    image: "https://res.cloudinary.com/dxhmgs7wt/image/upload/v1748578916/jrjgmunctd2whx6vukpy.webp",
  },
];
 
export default function AnimatedNailsyLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  // const images = Array.from({ length: 6 }, (_, i) => `/images/img${i + 1}.jpg`);
  
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
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
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
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-rose-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-300/30 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Animated Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg transform scale-98"
          : "bg-white/80 backdrop-blur-md shadow-sm"
      }`}>
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
 
            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 relative overflow-hidden group">
                <span className="relative z-10">Нэвтрэх</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
 
            {/* Animated Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-pink-500 transition-all duration-300 relative z-50"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                  }`}></span>
                  <span className={`w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
 
        {/* Animated Mobile Sidebar */}
        <div className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMenu}
          ></div>
          
          {/* Sidebar */}
          <div className={`absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="p-6 pt-20">
              <div className="space-y-4">
                {["Home", "Services", "About", "Contact"].map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className={`block px-4 py-3 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                      isMenuOpen ? 'animate-slideInRight' : ''
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
                  isMenuOpen ? 'animate-slideInRight' : ''
                }`}
                style={{ animationDelay: '400ms' }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>
 
      {/* Hero Section with Animations */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dxhmgs7wt/image/upload/v1748578916/jrjgmunctd2whx6vukpy.webp')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animated Text Content */}
            <div className="space-y-8">
              <div className="space-y-4 mt-[300px]">
                <p className="text-white font-medium tracking-wider uppercase animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                  Premium Hair Salon
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="inline-block animate-fadeInUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    LA
                  </span>
                  <span className="block bg-gradient-to-r from-white to-purple-600 bg-clip-text text-transparent animate-fadeInUp opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                    VIE
                  </span>
                </h1>
                <p className="text-xl text-white leading-relaxed animate-fadeInUp opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                  Loved by celebs like Sarah Jessica Parker, this upscale nail salon created by the one and only Bertie Capone herself is incredible.
                </p>
              </div>
 
              {/* Animated Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                <button className="bg-gradient-to-r from-white-500 to-pink-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 text-center font-semibold relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Book Appointment
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
 
              {/* Animated Stats */}
              <div className="flex items-center space-x-8 pt-8">
                {[
                  { number: "500+", label: "Happy Clients" },
                  { number: "5★", label: "Rating" },
                  { number: "3+", label: "Years" }
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center animate-fadeInUp opacity-0"
                    style={{ animationDelay: `${1200 + index * 200}ms`, animationFillMode: 'forwards' }}
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
 
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.img
                src="https://res.cloudinary.com/dxhmgs7wt/image/upload/v1748578916/jrjgmunctd2whx6vukpy.webp"
                alt="Bertie Capone"
                className="rounded-2xl shadow-2xl w-full h-auto"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl -z-10"></div>
            </div>
 
            {/* RIGHT TEXT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <p className="text-rose-600 font-medium tracking-wider uppercase mb-4">
                  About Us
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Premium Nail & Beauty Studio
                </h2>
              </div>
 
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Бид таны гоо сайхан, өөртөө итгэх итгэл, амар амгалан байдлыг дээдлэн эрхэмлэдэг мэргэжлийн хумсны болон гоо сайхны студи юм.
                  10+ жилийн туршлагатай чадварлаг баг хамт олонтойгоо бид үйлчилгээг үзүүлж байна.
                </p>
                <p> Манай хаяг:
                  Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Их дэлгүүрийн зүүн талд</p>
                <p>📞 Холбоо барих:
                  Утас: 9911-2233
                  Instagram: @premiumnails.mn
                  Facebook: Premium Nail & Beauty Studio</p>
              </div>
 
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-white/70 rounded-2xl shadow">
                  <div className="text-2xl font-bold text-rose-600 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
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
 
      {/* Team Section */}
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
            {teamMembers.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.name}
                title={member.position}
                handle={member.name.toLowerCase().replace(/\s/g, '')}
                status="Online"
                contactText="Цаг захиалах"
                avatarUrl={member.image}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log(`${member.name} руу холбогдлоо`)}
              />
            ))}
          </div>
        </div>
      </section>
 
      {/* Gallery Section */}
      <section id="photos" className="bg-white py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Work Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest nail designs and transformations
          </p>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {images.slice(0, 6).map((imageUrl, idx) => (
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
        </div> */}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 pt-[100px]">
              Nailsy
            </div>
            <p className="text-gray-400 mb-8">
              Where celebrity-approved service meets exceptional artistry.
            </p>
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