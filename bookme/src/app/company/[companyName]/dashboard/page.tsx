"use client";
import { useEffect, useState } from "react";
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

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("employees");
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

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Ачааллаж байна...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      );
    }

    switch (currentPage) {
      case "employees":
        return <EmployeesPage />;
      case "all-orders":
        return company ? <AllOrdersPage company={company} /> : null;
      case "staff-orders":
        return company ? <StaffOrdersPage company={company} /> : null;
      case "general-settings":
        return <GeneralSettingsPage />;
      case "images-settings":
        return <ImagesSettingsPage />;
      case "location-settings":
        return <LocationSettingsPage />;
      case "working-hours-settings":
        return company ? <CompanyWorkingHours company={company} /> : null;
      default:
        return <EmployeesPage />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <SidebarInset>
        <DashboardHeader currentPage={currentPage} />
        <div className="flex flex-1 flex-col gap-4 p-4">{renderPage()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
