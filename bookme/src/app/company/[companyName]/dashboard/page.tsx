"use client";
import { useEffect, useState, useCallback } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AllOrdersPage } from "./_components/AllOrders";
import { StaffOrdersPage } from "./_components/StaffOrders";
import { GeneralSettingsPage } from "./_components/General";
import { ImagesSettingsPage } from "./_components/Images";
import { EmployeesPage } from "./_components/EmployeesPage";
import { DashboardHeader } from "./_components/DashboardHeader";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { Company } from "../_components/CompanyTypes";
import { redirect } from "next/navigation";
import { api } from "@/axios";
import { toast } from "sonner";
import { CompanyWorkingHours } from "./_components/CompanyWorkingHours";
import { CompanyLocationGetData } from "./_components/CompanyLocationGetData";
import { EditTemplates } from "./_components/EditTemplate";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  ShoppingCart,
  Settings,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { PageContainer } from "./_components/PageContainer";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("employees");
  const { company: loggedInCompany, loading: companyLoading } =
    useCompanyAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/company/id/${loggedInCompany?._id}`);

      if (response.data?.company) {
        setCompany(response.data.company);
        return response.data.company;
      }
      throw new Error("Company data not found");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error");
      toast.error("Failed to fetch company");
      return null;
    } finally {
      setLoading(false);
    }
  }, [loggedInCompany?._id]);

  useEffect(() => {
    if (!companyLoading && !loggedInCompany) {
      redirect("/signin");
    } else if (loggedInCompany?._id) {
      fetchCompany();
    }
  }, [companyLoading, loggedInCompany?._id, fetchCompany]);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">Loading...</div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-red-500">{error}</div>
          <Button variant="outline" onClick={fetchCompany}>
            Retry
          </Button>
        </div>
      );
    }
    if (!company) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No company data
        </div>
      );
    }

    switch (currentPage) {
      case "employees":
        return (
            <EmployeesPage />
        );
      case "all-orders":
        return (
            <AllOrdersPage company={company} />
        );
      case "staff-orders":
        return (
            <StaffOrdersPage company={company} />
        );
      case "general-settings":
        return (
          <PageContainer>
            <GeneralSettingsPage />
          </PageContainer>
        );
      case "images-settings":
        return (
          <PageContainer>
            <ImagesSettingsPage />
          </PageContainer>
        );
      case "location-settings":
        return (
          <PageContainer>
            <CompanyLocationGetData />
          </PageContainer>
        );
      case "working-hours-settings":
        return (
          <PageContainer>
            <CompanyWorkingHours company={company} />
          </PageContainer>
        );
      case "templates-settings":
        return (
          <PageContainer>
            <EditTemplates company={company} fetchCompany={fetchCompany} />
          </PageContainer>
        );
      default:
        return (
          <PageContainer>
            <EmployeesPage />
          </PageContainer>
        );
    }
  };
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {company?.companyName}
                </div>
                <div className="text-xs text-gray-500">
                  Компаний хяналтын самбар
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              onClick={() => setCurrentPage("employees")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                currentPage === "employees"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5" />
              Ажилчид
            </button>

            <div>
              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage === "all-orders" ||
                      currentPage === "staff-orders"
                      ? "employees"
                      : "all-orders"
                  )
                }
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition ${
                  ["all-orders", "staff-orders"].includes(currentPage)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  Захиалгууд
                </div>
                <ChevronDown
                  className={`w-4 h-4 transform transition ${
                    ["all-orders", "staff-orders"].includes(currentPage)
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {["all-orders", "staff-orders"].includes(currentPage) && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => setCurrentPage("all-orders")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "all-orders"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Бүх захиалга
                  </button>
                  <button
                    onClick={() => setCurrentPage("staff-orders")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "staff-orders"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Ажилтны захиалга
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() =>
                  setCurrentPage(
                    [
                      "general-settings",
                      "images-settings",
                      "location-settings",
                      "working-hours-settings",
                      "templates-settings",
                    ].includes(currentPage)
                      ? "employees"
                      : "general-settings"
                  )
                }
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition ${
                  [
                    "general-settings",
                    "images-settings",
                    "location-settings",
                    "working-hours-settings",
                    "templates-settings",
                  ].includes(currentPage)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  Тохиргоо
                </div>
                <ChevronDown
                  className={`w-4 h-4 transform transition ${
                    [
                      "general-settings",
                      "images-settings",
                      "location-settings",
                      "working-hours-settings",
                      "templates-settings",
                    ].includes(currentPage)
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {[
                "general-settings",
                "images-settings",
                "location-settings",
                "working-hours-settings",
                "templates-settings",
              ].includes(currentPage) && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => setCurrentPage("general-settings")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "general-settings"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Ерөнхий
                  </button>
                  <button
                    onClick={() => setCurrentPage("images-settings")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "images-settings"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Компаний зураг
                  </button>
                  <button
                    onClick={() => setCurrentPage("location-settings")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "location-settings"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Байршил
                  </button>
                  <button
                    onClick={() => setCurrentPage("working-hours-settings")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "working-hours-settings"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Ажлын цаг
                  </button>
                  <button
                    onClick={() => setCurrentPage("templates-settings")}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      currentPage === "templates-settings"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    Template
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <a
              href={`/company/${company?.companyName}`}
              className="flex items-center gap-3 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Буцах
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden w-full">
          <DashboardHeader currentPage={currentPage} />
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto w-full">{renderPage()}</div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
