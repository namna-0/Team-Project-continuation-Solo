"use client";
import { useEffect, useState, useCallback } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AllOrdersPage } from "./_components/AllOrders";
import { StaffOrdersPage } from "./_components/StaffOrders";
import { GeneralSettingsPage } from "./_components/General";
import { ImagesSettingsPage } from "./_components/Images";
import { LocationSettingsPage } from "./_components/Location";
import { AppSidebar } from "./_components/AppSidebar";
import { DashboardHeader } from "./_components/DashboardHeader";
import { EmployeesPage } from "./_components/EmployeesPage";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { Company } from "../_components/CompanyTypes";
import { useRouter } from "next/navigation";
import { api } from "@/axios";
import { toast } from "sonner";
import { CompanyWorkingHours } from "./_components/CompanyWorkingHours";
import { CompanyLocationGetData } from "./_components/CompanyLocationGetData";
import { EditTemplates } from "./_components/EditTemplate";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("employees");
  const { company: loggedInCompany } = useCompanyAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Stable fetchCompany function with proper error handling
  const fetchCompany = useCallback(async () => {
    if (!loggedInCompany?._id) {
      setError("Company ID not found");
      return null;
    }

    try {
      setLoading(true);
      const response = await api.get(`/company/id/${loggedInCompany._id}`);
      if (response.data?.company) {
        setCompany(response.data.company);
        return response.data.company;
      }
      throw new Error("Company data not found in response");
    } catch (error) {
      console.error("Failed to fetch company:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      toast.error("Failed to load company data");
      return null;
    } finally {
      setLoading(false);
    }
  }, [loggedInCompany?._id]);

  // Initial data fetch
  useEffect(() => {
    if (!loggedInCompany) {
      router.push("/signin");
      return;
    }

    fetchCompany();
  }, [loggedInCompany, router, fetchCompany]);

  // Improved page rendering with proper loading states
  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">Loading...</div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-red-500 text-center">{error}</div>
          <Button variant="outline" onClick={() => fetchCompany()}>
            Retry
          </Button>
        </div>
      );
    }

    if (!company) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">No company data available</div>
        </div>
      );
    }

    switch (currentPage) {
      case "employees":
        return <EmployeesPage />;
      case "all-orders":
        return <AllOrdersPage company={company} />;
      case "staff-orders":
        return <StaffOrdersPage company={company} />;
      case "general-settings":
        return <GeneralSettingsPage />;
      case "images-settings":
        return <ImagesSettingsPage />;
      case "location-settings":
        return <CompanyLocationGetData />;
      case "working-hours-settings":
        return <CompanyWorkingHours company={company} />;
      case "templates-settings":
        return (
          <EditTemplates
            company={company}
            fetchCompany={fetchCompany}
            onSuccess={() => toast.success("Template updated successfully")}
          />
        );
      default:
        return <EmployeesPage />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <SidebarInset>
        <DashboardHeader currentPage={currentPage} />
        <div className="flex flex-1 flex-col gap-4 p-4 md:overflow-y-auto">
          {renderPage()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
