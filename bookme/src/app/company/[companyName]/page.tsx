"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/axios";
import { CompanyFooter } from "./_components/CompanyFooter";
import { GlobalStyles } from "./_components/GlobalStyles";
import { CompanyWorkingHours } from "./_components/CompanyWorkingHours";
import { CompanyNavBar } from "./_components/CompanyNavBar";
import { CompanyBackgroundImageText } from "./_components/CompanyBackgroundImageText";
import { Company } from "./_components/CompanyTypes";
import { CompanyLocation } from "./_components/CompanyLocation";
import { CompanyLibrary } from "./_components/CompanyLibrary";
import { AboutCompany } from "./_components/AboutCompany";
import { EmployeeCardColorfulList } from "./_components/CompanyEmployeeCard";

export default function CompanyHomepage() {
  const { companyName } = useParams<{ companyName: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [companyLocation, setCompanyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/company/name/${companyName}`);
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

  console.log("company medeelel", company);

  useEffect(() => {
    if (company) {
      if (company.lat && company.lng) {
        setCompanyLocation({
          lat: company.lat,
          lng: company.lng,
        });
      } else if (company.address) {
        setCompanyLocation({
          lat: 47.9185,
          lng: 106.9176,
        });
      }
    }
  }, [company]);

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
      <CompanyNavBar
        company={company}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <CompanyBackgroundImageText companyName={companyName} company={company} />

      <AboutCompany company={company} />

      {company.workingHours && <CompanyWorkingHours company={company} />}

      {company.employees && company.employees.length > 0 && (
        <EmployeeCardColorfulList company={company} />
      )}

      <CompanyLocation company={company} companyLocation={companyLocation} />

      {company.companyImages && company.companyImages.length > 0 && (
        <CompanyLibrary company={company} />
      )}
      <footer className="bg-gray-900 text-white py-12 h-[450px]">
        <CompanyFooter companyName={companyName} />
      </footer>

      <GlobalStyles />
    </div>
  );
}
