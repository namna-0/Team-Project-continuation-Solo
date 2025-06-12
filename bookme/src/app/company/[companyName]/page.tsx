"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  Heart,
  Zap,
  ArrowBigDown,
} from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    name: "Classic Manicure",
    description: "Traditional nail care with cuticle treatment, nail shaping, and polish application.",
    price: "$45",
    duration: "45 min",
    image: "/api/placeholder/300/200",
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
    {
    id: 3,
    name: "Express Manicure",
    description: "For women on the move. Quick nail shaping with GEMINI Nourishing Nail Polish application.",
    price: "$35",
    duration: "30 min",
    image: "/api/placeholder/300/200",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jessica Parker",
    text: "Absolutely incredible service! Bertie and her team always exceed my expectations. The attention to detail is phenomenal.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
  {
    id: 2,
    name: "Emma Thompson",
    text: "This upscale nail salon is my go-to place. The atmosphere is relaxing and the results are always perfect.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
  {
    id: 3,
    name: "Jennifer Walsh",
    text: "I've been coming here for years. The quality and consistency of their work is unmatched in the city.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
    {
    id: 3,
    name: "Jennifer Walsh",
    text: "I've been coming here for years. The quality and consistency of their work is unmatched in the city.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
];
interface Stylist {
  id: number;
  name: string;
  specialty: string;
  image: string;
  bio: string;
}

const stylists: Stylist[] = [
  {
    id: 1,
    name: "Солонго",
    specialty: "Будаг, Буржгар",
    image: "/stylists/solongo.jpg",
    bio: "10 жилийн туршлагатай. Үсийг өнгө оруулж, буржгардуулах мэргэшсэн үсчин.",
  },
  {
    id: 2,
    name: "Тэмүүлэн",
    specialty: "Эрэгтэй засал",
    image: "/stylists/temuulen.jpg",
    bio: "Шинэ хэв маяг, fade болон undercut загваруудыг хийдэг.",
  },
  {
    id: 3,
    name: "Намуун",
    specialty: "Гоо сайхан + Үс",
    image: "/stylists/namuun.jpg",
    bio: "Гоо сайхан болон засалт хослуулдаг. Онцгой арга хэмжээний засал мэргэжилтэй.",
  },
];

export default function AnimatedNailsyLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
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
                <span className="relative z-10">Book Now</span>
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
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animated Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-pink-500 font-medium tracking-wider uppercase animate-fadeInUp opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                  Premium Nail Care
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="inline-block animate-fadeInUp opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    Luxury Nail
                  </span>
                  <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent animate-fadeInUp opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                    Experience
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed animate-fadeInUp opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                  Loved by celebs like Sarah Jessica Parker, this upscale nail salon created by the one and only Bertie Capone herself is incredible.
                </p>
              </div>

              {/* Animated Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 text-center font-semibold relative overflow-hidden group">
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

            {/* Animated Image */}
            <div className="relative animate-fadeInUp opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
              <div className="relative z-10 group">
                <div className="w-full h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-700 font-medium">Luxury Nail Salon</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-pink-300/50 to-purple-300/50 rounded-2xl -z-10 group-hover:scale-110 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-pink-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/api/placeholder/600/500"
                alt="Bertie Capone"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl -z-10"></div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-pink-500 font-medium tracking-wider uppercase mb-4">
                  About Us
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Meet Bertie Capone
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  With over a decade of experience in the beauty industry,
                  Bertie Capone has established herself as one of the premier
                  nail artists in the city. Her passion for perfection and eye
                  for detail have made her the go-to choice for celebrities and
                  discerning clients alike.
                </p>
                <p>
                  At Nailsy, we believe that nail care is an art form. Every
                  service is meticulously crafted to not only enhance your
                  natural beauty but to provide you with a luxurious experience
                  that rejuvenates both body and spirit.
                </p>
                <p>
                  Our commitment to excellence extends beyond just our services.
                  We use only the finest products, maintain the highest
                  standards of hygiene, and continuously stay updated with the
                  latest trends and techniques in nail care.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-white/50 rounded-2xl">
                  <div className="text-2xl font-bold text-pink-500 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-2xl">
                  <div className="text-2xl font-bold text-pink-500 mb-2">
                    Celebrity
                  </div>
                  <div className="text-gray-600">Approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-medium tracking-wider uppercase mb-4">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premium Nail Care
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                data-index={index}
                className={`bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  visibleCards.includes(index) ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl mb-6 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-pink-500">{service.price}</span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Testimonials */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-medium tracking-wider uppercase mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current animate-pulse"
                      size={24}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-pink-500" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">Valued Client</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? "bg-pink-500 scale-125" 
                      : "bg-gray-300 hover:bg-pink-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


<section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <img
              className="mb-4 size-full rounded-lg object-contain"
              src={imageUrl}
              alt={`Random stock image ${idx + 1}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {stylists.map((stylist) => (
        <div
          key={stylist.id}
          className="group relative w-44 sm:w-48 h-60 sm:h-64 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-[1.3] hover:z-20"
        >
          <img
            src={stylist.image}
            alt={stylist.name}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:blur-sm"
          />

          {/* Overlay for content */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-xl font-bold mb-1">{stylist.name}</h3>
            <p className="text-sm italic mb-2">{stylist.specialty}</p>
            <p className="text-sm text-center line-clamp-3">{stylist.bio}</p>
            <Button className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-full px-6 py-2 text-sm">
              Book Now
            </Button>
          </div>

          {/* Bottom caption (always visible) */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-800/80 text-center p-2 text-sm font-medium">
            {stylist.name}
          </div>
        </div>
      ))}
    </div>
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
