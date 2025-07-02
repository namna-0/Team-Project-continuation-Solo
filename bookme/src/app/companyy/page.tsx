"use client";
import { api } from "@/axios";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Mail,
  Star,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Company } from "../company/[companyName]/_components/CompanyTypes";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const params = useParams();

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await api.get("/company");
        setCompanies(response.data.companies);
      } catch (error) {
        console.error(error);
      }
    };
    getCompanies();
  }, []);

  useEffect(() => {
    if (companies.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [companies]);

  useEffect(() => {
    const currentCompany = companies[currentIndex];
    const currentId = currentCompany?._id;
    if (!currentId || !currentCompany?.companyImages?.length) return;

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [currentId]:
          ((prev[currentId] || 0) + 1) % currentCompany.companyImages.length,
      }));
    }, 4000);
    return () => clearInterval(imageInterval);
  }, [companies, currentIndex]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.companyName.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [companies, search]);

  const visibleCompanies = useMemo(() => {
    const total = filteredCompanies.length;
    return filteredCompanies.filter((_, i) => {
      const offset = (i - currentIndex + total) % total;
      return [0, 1, 2, total - 1, total - 2].includes(offset);
    });
  }, [filteredCompanies, currentIndex]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) {
      setCurrentIndex((prev) => (prev + 1) % filteredCompanies.length);
    } else if (info.offset.x > 100) {
      setCurrentIndex((prev) =>
        prev === 0 ? filteredCompanies.length - 1 : prev - 1
      );
    }
  };

  const getCurrentImage = (company: Company) => {
    const allImages = [...(company.companyImages || [])];
    if (company.aboutUsImage) allImages.push(company.aboutUsImage);
    if (allImages.length === 0) return null;
    const currentIdx = company._id ? currentImageIndex[company._id] || 0 : 0;
    return allImages[currentIdx % allImages.length];
  };

  const getTotalImages = (company: Company) => {
    let count = 0;
    if (company.companyImages) count += company.companyImages.length;
    if (company.aboutUsImage) count += 1;
    return count;
  };

  const formatImageUrl = (url: string) => {
    if (!url) return "/default-logo.jpg";
    if (url.startsWith("http") || url.startsWith("/")) return url;
    return `/${url}`;
  };

  return (
    <div className="h-fit bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative w-40 h-12 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/default-logo.jpg"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            <div className="hidden md:block">
              <motion.div
                className="relative w-[350px]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl" />
                <div className="relative h-12 flex items-center gap-3 px-4 border border-white/30 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-400/50 focus-within:border-blue-400/50 transition-all">
                  <Search className="text-gray-500 w-5 h-5" />
                  <input
                    placeholder="Компаний нэрээр хайна уу..."
                    className="flex-1 border-none outline-none text-sm placeholder-gray-400 bg-transparent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Header Section */}
        <motion.div
          className="w-full max-w-2xl text-center mt-12 mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative mb-6">
            <motion.div
              className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/default-logo.jpg"
                alt="Company Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-10">
            Bookme компаниуд
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-[20px]">
            Өөрийн сонирхсон компанийг сонгож, цагаа захиална уу
          </p>
        </motion.div>

        {/* Companies Carousel */}
        <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center mb-16">
          <AnimatePresence mode="wait">
            {filteredCompanies.map((company, i) => {
              const total = filteredCompanies.length;
              const offset = (i - currentIndex + total) % total;
              let xOffset = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;
              let rotateY = 0;

              if (offset === 1) {
                xOffset = 420;
                scale = 0.85;
                opacity = 0.7;
                zIndex = 9;
                rotateY = -15;
              } else if (offset === total - 1) {
                xOffset = -420;
                scale = 0.85;
                opacity = 0.7;
                zIndex = 9;
                rotateY = 15;
              } else if (offset === 2) {
                xOffset = 720;
                scale = 0.7;
                opacity = 0.4;
                zIndex = 8;
                rotateY = -25;
              } else if (offset === total - 2) {
                xOffset = -720;
                scale = 0.7;
                opacity = 0.4;
                zIndex = 8;
                rotateY = 25;
              } else if (offset === 0) {
                xOffset = 0;
                scale = 1;
                zIndex = 10;
                rotateY = 0;
              } else {
                opacity = 0;
                zIndex = 1;
              }

              const isCenter = offset === 0;
              const currentImage = getCurrentImage(company);
              const totalImages = getTotalImages(company);

              return (
                <motion.div
                  key={company._id}
                  className="absolute w-[600px] h-[700px] cursor-pointer"
                  style={{
                    zIndex,
                    opacity,
                    perspective: "1000px",
                  }}
                  animate={{
                    x: xOffset,
                    scale,
                    rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={isCenter ? handleDragEnd : undefined}
                  whileHover={isCenter ? { scale: 1.02 } : {}}
                  whileTap={isCenter ? { scale: 0.98 } : {}}
                >
                  <div className="relative w-full h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden group">
                    {/* Image Section */}
                    <div className="relative w-full h-105 overflow-hidden">
                      <AnimatePresence mode="wait">
                        {currentImage ? (
                          <motion.div
                            key={`${company._id}-${
                              currentImageIndex[company._id] || 0
                            }`}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={currentImage}
                              alt={company.companyName}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </motion.div>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-gray-400 text-6xl">🏢</div>
                          </div>
                        )}
                      </AnimatePresence>

                      {/* Image indicator */}
                      {totalImages > 1 && (
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                          {((currentImageIndex[company._id] || 0) %
                            totalImages) +
                            1}
                          /{totalImages}
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Logo overlay */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 shadow-lg bg-white/90 backdrop-blur-sm">
                        <Image
                          src={formatImageUrl(company.companyLogo)}
                          alt="Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col justify-between h-[264px]">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
                          {company.companyName}
                        </h2>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {company.description}
                        </p>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-gray-500">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="line-clamp-1">
                              {company.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Mail className="w-4 h-4 text-purple-500" />
                            <span className="line-clamp-1">
                              {company.email}
                            </span>
                          </div>
                          {company.clientNumber && (
                            <div className="flex items-center gap-2 text-gray-500">
                              <Users className="w-4 h-4 text-green-500" />
                              <span>{company.clientNumber}+ үйлчлүүлэгч</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <Link
                          href={`/company/${company.companyName}`}
                          className="block"
                        >
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                            <Calendar className="w-4 h-4 mr-2" />
                            Цаг захиалах
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-165 flex gap-4 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? filteredCompanies.length - 1 : prev - 1
                )
              }
              className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % filteredCompanies.length)
              }
              className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-20 flex gap-2 z-40">
            {filteredCompanies.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 mt-[100px]">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {companies.length}+
            </h3>
            <p className="text-gray-600">Бүртгэгдсэн компани</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 mt-[100px]">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9</h3>
            <p className="text-gray-600">Дундаж үнэлгээ</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 mt-[100px]">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Цагийн захиалга</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
