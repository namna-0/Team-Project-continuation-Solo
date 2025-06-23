"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Company } from "../CompanyTypes";
import { CompanyNavBar } from "../CompanyNavBar";
import { CompanyBackgroundImageText } from "../CompanyBackgroundImageText";
import { AboutCompany } from "../AboutCompany";
import { CompanyWorkingHours } from "../CompanyWorkingHours";
import { EmployeeCardColorfulList } from "../CompanyEmployeeCard";
import { CompanyLocation } from "../CompanyLocation";
import { CompanyLibrary } from "../CompanyLibrary";
import { CompanyFooter } from "../CompanyFooter";
import { GlobalStyles } from "../GlobalStyles";

interface ClassicTemplateProps {
  data: Company;
  companyName: string;
  isPreview?: boolean;
}

export const Template2: React.FC<ClassicTemplateProps> = ({
  data,
  companyName,
  isPreview = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [companyLocation, setCompanyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Memoized values
  const hasEmployees = useMemo(
    () => data.employees && data.employees.length > 0,
    [data.employees]
  );
  const hasImages = useMemo(
    () => data.companyImages && data.companyImages.length > 0,
    [data.companyImages]
  );

  // Scroll handler with debounce
  useEffect(() => {
    if (isPreview) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPreview]);

  // Intersection observer for cards
  useEffect(() => {
    if (isPreview) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
              10
            );
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isPreview]);

  // Location effect
  useEffect(() => {
    if (!data) return;

    if (data.lat && data.lng) {
      setCompanyLocation({
        lat: data.lat,
        lng: data.lng,
      });
    } else if (data.address) {
      setCompanyLocation({
        lat: 47.9185,
        lng: 106.9176,
      });
    }
  }, [data]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Decorative elements
  const renderDecorativeElements = !isPreview && (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNMCAwTDYwIDBNNjAgMEwwIDYwIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-10"></div>

      {/* Subtle accent lights */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-800 rounded-full blur-[100px] opacity-5"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gray-800 rounded-full blur-[100px] opacity-5"></div>
    </div>
  );

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden ${
        isPreview ? "pointer-events-none" : ""
      }`}
    >
      {/* Dark background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900"></div>

      {renderDecorativeElements}

      <CompanyNavBar
        company={data}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        // className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
      />

      <CompanyBackgroundImageText companyName={companyName} company={data} />

      <main className="relative z-10 space-y-8 pb-20 pt-4">
        {/* About Company Section */}
        <div
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-gray-800/20 transition-shadow duration-300"
          data-index="0"
        >
          <AboutCompany company={data} />
        </div>

        {/* Working Hours Section */}
        {data.workingHours && (
          <div
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-gray-800/20 transition-shadow duration-300"
            data-index="1"
          >
            <CompanyWorkingHours company={data} />
          </div>
        )}

        {/* Employees Section */}
        {hasEmployees && (
          <div
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-gray-800/20 transition-shadow duration-300"
            data-index="2"
          >
            <EmployeeCardColorfulList company={data} />
          </div>
        )}

        {/* Location Section */}
        <div
          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-gray-800/20 transition-shadow duration-300"
          data-index="3"
        >
          <CompanyLocation company={data} companyLocation={companyLocation} />
        </div>

        {/* Gallery Section */}
        {hasImages && (
          <div
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl mx-4 sm:mx-8 lg:mx-16 p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-gray-800/20 transition-shadow duration-300"
            data-index="4"
          >
            <CompanyLibrary company={data} />
          </div>
        )}
      </main>

      <footer className="relative z-10 bg-gray-900 border-t border-gray-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompanyFooter companyName={companyName} />
        </div>
      </footer>

      <GlobalStyles />
    </div>
  );
};
