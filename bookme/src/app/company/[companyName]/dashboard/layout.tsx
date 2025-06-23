"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Image,
  MapPin,
  Info,
  LogOut,
} from "lucide-react";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { Company } from "../_components/CompanyTypes";
import { api } from "@/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookingsTab } from "./_components/BookingsTab";
import { EmployeesTab } from "./_components/EmployeesTab";
import { StatCard } from "./_components/StatCard";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("bookings");
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { company: loggedInCompany } = useCompanyAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

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

  const handleSettingsClick = () => {
    if (activeTab !== "settings") {
      setActiveTab("settings");
      setIsSettingsOpen(true);
    } else {
      setIsSettingsOpen(!isSettingsOpen);
    }
  };

  const handleSettingsSubClick = (subTab: string) => {
    setActiveSettingsTab(subTab);
    setActiveTab("settings");
    setIsSettingsOpen(true);
  };

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
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-purple-700">
              Тохиргоо
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              {activeSettingsTab === "general" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info size={20} className="text-purple-600" />
                    Ерөнхий мэдээлэл
                  </h3>
                  <p className="text-gray-600">Компанийн үндсэн тохиргоонууд</p>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Компанийн нэр
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={company.companyName}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          И-мэйл
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={company.email || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSettingsTab === "photos" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Image size={20} className="text-purple-600" />
                    Зурагнууд
                  </h3>
                  <p className="text-gray-600">
                    Профайл болон галерей зурагнууд
                  </p>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Image
                          size={24}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="text-sm text-gray-500">Зураг нэмэх</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSettingsTab === "location" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-purple-600" />
                    Байршил
                  </h3>
                  <p className="text-gray-600">Салбарын байршлын мэдээлэл</p>
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Хаяг
                        </label>
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={3}
                          placeholder="Дэлгэрэнгүй хаяг оруулна уу"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Утасны дугаар
                        </label>
                        <input
                          type="tel"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="+976 XXXX XXXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500 text-lg">
            ⚙️ Тохиргооны хэсэг одоогоор хоосон байна.
          </div>
        );
    }
  };

  const menuItems = [
    {
      title: "Захиалгууд",
      icon: Calendar,
      id: "bookings",
    },
    {
      title: "Ажилчид",
      icon: Users,
      id: "employees",
    },
  ];

  const settingsItems = [
    {
      title: "Ерөнхий мэдээлэл",
      icon: Info,
      id: "general",
    },
    {
      title: "Зурагнууд",
      icon: Image,
      id: "photos",
    },
    {
      title: "Байршил",
      icon: MapPin,
      id: "location",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Sidebar className="border-r-0">
          <SidebarHeader className="bg-gradient-to-b from-purple-800 to-indigo-900 text-white">
            <div className="p-4">
              <h1 className="text-lg font-bold flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Settings size={16} />
                </div>
                {company.companyName}
              </h1>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-gradient-to-b from-purple-800 to-indigo-900 text-white">
            <SidebarGroup>
              <SidebarGroupLabel className="text-white/70">
                Цэс
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "hover:bg-white/10 hover:text-white",
                          activeTab === item.id && "bg-white/20 text-white"
                        )}
                      >
                        <item.icon size={16} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                  <SidebarMenuItem>
                    <Collapsible
                      open={isSettingsOpen}
                      onOpenChange={setIsSettingsOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={handleSettingsClick}
                          className={cn(
                            "hover:bg-white/10 hover:text-white",
                            activeTab === "settings" && "bg-white/20 text-white"
                          )}
                        >
                          <Settings size={16} />
                          <span>Тохиргоо</span>
                          {isSettingsOpen ? (
                            <ChevronDown size={16} className="ml-auto" />
                          ) : (
                            <ChevronRight size={16} className="ml-auto" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {settingsItems.map((item) => (
                            <SidebarMenuSubItem key={item.id}>
                              <SidebarMenuSubButton
                                onClick={() => handleSettingsSubClick(item.id)}
                                className={cn(
                                  "hover:bg-white/10 hover:text-white",
                                  activeSettingsTab === item.id &&
                                    activeTab === "settings" &&
                                    "bg-white/20 text-white"
                                )}
                              >
                                <item.icon size={14} />
                                <span>{item.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-gradient-to-b from-purple-800 to-indigo-900 text-white border-t border-purple-700">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    // Add logout logic here
                  }}
                  className="hover:bg-white/10 hover:text-white"
                >
                  <LogOut size={16} />
                  <span>Гарах</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-8">
            <SidebarTrigger />
            <div className="flex-1 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                🌟 Хяналтын Самбар
              </h1>
              <p className="text-gray-600">
                Захиалга болон үйлчилгээний мэдээлэл
              </p>
            </div>
          </div>

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
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
