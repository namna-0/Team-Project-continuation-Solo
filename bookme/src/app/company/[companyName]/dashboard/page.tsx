"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { Company } from "../_components/CompanyTypes";
import { api } from "@/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./_components/Sidebar";
import { BookingsTab } from "./_components/BookingsTab";
import { EmployeesTab } from "./_components/EmployeesTab";
import { StatCard } from "./_components/StatCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const { company: loggedInCompany } = useCompanyAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (activeTab === "settings" && loggedInCompany?.companyName) {
      router.push(`/company/${loggedInCompany.companyName}/settings`);
    }
  }, [activeTab, loggedInCompany?.companyName, router]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/company/id/${loggedInCompany?._id}`);
        if (response.data && response.data.company) {
          setCompany(response.data.company);
        }
      } catch (error) {
        console.error("Компаний мэдээлэл авахад алдаа гарлаа", error);
        toast.error("Компаний мэдээлэл авахад алдаа гарлаа");
        setError("Компаний мэдээлэл авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    if (loggedInCompany?._id) {
      fetchCompany();
    }
  }, [loggedInCompany?._id]);
  console.log("company", company);

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "bookings":
        return <BookingsTab company={company} />;
      case "employees":
        return <EmployeesTab company={company} />;
      case "settings":
        return null;
      default:
        return (
          <div className="text-center text-gray-500 text-lg">
            ⚙️ Тохиргооны хэсэг одоогоор хоосон байна.
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <BookingsTab company={company} filterStatus={bookingStatus} />
      <main className="ml-64 flex-1 p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🌟 Хяналтын Самбар
          </h1>
          <p className="text-gray-600">Захиалга болон үйлчилгээний мэдээлэл</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Calendar}
            label="Захиалга"
            value={company?.bookings?.length ?? 0}
            gradient="from-pink-500 to-rose-600 opacity-40"
            iconBg="bg-white/20"
          />
          <StatCard
            icon={Users}
            label="Ажилчид"
            value={company?.employees?.length ?? 0}
            gradient="from-blue-500 to-indigo-600 opacity-40"
            iconBg="bg-white/20"
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
