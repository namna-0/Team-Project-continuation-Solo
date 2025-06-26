"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock } from "lucide-react";
import { Company, Employee, Booking } from "../../_components/CompanyTypes";
import { useEffect, useState } from "react";
import { StaffOrdersList } from "./StaffOrderList";
import { BookingCalendar } from "./Calendar";

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "secondary";
    case "confirmed":
      return "default";
    case "completed":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export function StaffOrdersPage({ company }: { company: Company }) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getEmployeeBookings = (employeeId: string): Booking[] => {
    if (!company.bookings) return [];
    return company.bookings.filter(
      (booking) => booking.employee._id === employeeId
    );
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    const bookings = getEmployeeBookings(employee._id);
    setSelectedBookings(bookings);
  };

  const showAllBookings = () => {
    setSelectedEmployee(null);
    setSelectedBookings(company.bookings || []);
  };

  const displayBookings = selectedEmployee
    ? selectedBookings
    : company.bookings || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEmployee]);

  const activeStaff =
    company.employees?.filter((emp) => emp.availability)?.length || 0;
  const pendingOrders = displayBookings.filter(
    (booking) => booking.status === "pending"
  ).length;
  const completedToday = displayBookings.filter((booking) => {
    if (!booking.selectedTime) return false;
    const selectedDate = new Date(booking.selectedTime);
    if (isNaN(selectedDate.getTime())) return false;
    const today = new Date().toISOString().split("T")[0];
    const bookingDate = selectedDate.toISOString().split("T")[0];
    return bookingDate === today && booking.status === "completed";
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Ажилчдын цаг захиалга
          </h1>
          <p className="text-muted-foreground">
            {selectedEmployee
              ? `${selectedEmployee.employeeName}-ийн захиалгууд`
              : "Бүх ажилтнуудын цаг захиалга"}
          </p>
        </div>
        {selectedEmployee && (
          <Button variant="outline" onClick={showAllBookings}>
            Бүх захиалга харах
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Идэвхтэй ажилтан
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStaff}</div>
            <p className="text-xs text-muted-foreground">Одоо ажиллаж байгаа</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Хүлээгдэж буй захиалга
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Гүйцэтгэх ёстой</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Өнөөдөр дууссан
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
            <p className="text-xs text-muted-foreground">
              Гүйцэтгэсэн захиалга
            </p>
          </CardContent>
        </Card>
      </div>
      <StaffOrdersList
        company={company}
        selectedEmployee={selectedEmployee}
        getEmployeeBookings={getEmployeeBookings}
        handleEmployeeSelect={handleEmployeeSelect}
      />
      {selectedEmployee && (
        <BookingCalendar
          company={company}
          selectedEmployee={selectedEmployee}
          bookings={displayBookings}
        />
      )}
    </div>
  );
}
