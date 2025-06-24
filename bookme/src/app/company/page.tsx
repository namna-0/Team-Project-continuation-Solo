"use client";
import { api } from "@/axios";
import { useEffect, useState } from "react";
import { Company } from "./[companyName]/_components/CompanyTypes";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().startsWith(search.toLowerCase())
  );
  return (
    <div className="w-screen h-screen bg-[#f9f9f9] flex flex-col items-center">
      <nav className=" top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-10 rounded-full">
                <Image
                  src="/default-logo.jpg"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-[280px] h-10 flex items-center gap-2 px-3 border border-gray-300 rounded-lg shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-400 transition">
                <Search className="text-gray-500 w-4 h-4" />
                <input
                  placeholder="Компаний нэрээр хайна уу"
                  className="flex-1 border-none outline-none text-sm placeholder-gray-400 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-[534px] h-fit flex flex-col gap-6 mt-[50px]">
        <div className="w-full h-[128px]  px-[30px] justify-center flex flex-col items-center">
          <Image
            src="/default-logo.jpg"
            alt="Company Logo"
            width={40}
            height={40}
          />
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-[20px]">
              Bookme системид бүртгэлтэй компаниуд
            </p>
            <p className="text-gray-500 text-[12px]">
              Өөрийн сонирхсон компани дээр дарж цагаа захиална уу.
            </p>
          </div>
        </div>
        {filteredCompanies.map((company) => (
          <div
            key={company._id}
            className="border border-gray-300 p-4 rounded-md shadow bg-white w-full flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <img
                src={company.companyLogo}
                className="h-[40px] w-[40px] "
              ></img>
              <h2 className="text-[24px] font-semibold">
                {company.companyName}
              </h2>
            </div>
            <div>
              <p className="text-[14px] text-gray-700">{company.description}</p>
              <p className="text-[12px] text-gray-500 mt-2">
                <span className="font-semibold">Хаяг:</span>
                {company.address}
              </p>
              <p className="text-[12px] text-gray-500 mt-2">
                <span className="font-semibold"> Email хаяг:</span>
                {company.email}
              </p>
            </div>
            <div className="flex justify-end">
              <Link href={`/company/${company.companyName}`}>
                <Button className="relative bg-[#77b8fa] group w-[77px] h-10 px-6 py-2 rounded-full overflow-hidden text-white cursor-pointer">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#77b8fa] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  <span className="relative z-10">Зочлох</span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
