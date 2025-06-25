"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock } from "lucide-react";
import { Company, Employee, Booking } from "../../_components/CompanyTypes";
import { useEffect, useState } from "react";
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = displayBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(displayBookings.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEmployee]);

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

      <Card>
        <CardHeader>
          <CardTitle>Ажилтнууд</CardTitle>
          <CardDescription>
            Ажилтан дээр дарж тухайн ажилтны захиалгуудыг харах
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {company.employees?.map((employee) => (
              <Button
                key={employee._id}
                variant={
                  selectedEmployee?._id === employee._id ? "default" : "outline"
                }
                onClick={() => handleEmployeeSelect(employee)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                {employee.employeeName}
                <Badge variant="secondary" className="ml-1">
                  {getEmployeeBookings(employee._id).length}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedEmployee
              ? `${selectedEmployee.employeeName}-ийн захиалгууд`
              : "Бүх захиалгууд"}
          </CardTitle>
          <CardDescription>
            {selectedEmployee
              ? `Тухайн ажилтанд хуваарилагдсан захиалгууд`
              : "Одоогоор байгаа бүх захиалгууд"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {displayBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {selectedEmployee
                ? "Тухайн ажилтанд захиалга байхгүй байна"
                : "Захиалга байхгүй байна"}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Захиалгын ID</TableHead>
                    <TableHead>Ажилтан</TableHead>
                    <TableHead>Үйлчлүүлэгч</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Огноо/Цаг</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentBookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">
                        {booking._id.slice(-6)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {booking.employee.profileImage && (
                            <img
                              src={booking.employee.profileImage}
                              alt={booking.employee.employeeName}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          {booking.employee.employeeName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.user?.username || "Хэрэглэгч"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(booking.status) as any}>
                          {booking.status === "pending" && "Хүлээгдэж буй"}
                          {booking.status === "confirmed" && "Баталгаажсан"}
                          {booking.status === "completed" && "Дууссан"}
                          {booking.status === "cancelled" && "Цуцлагдсан"}
                          {![
                            "pending",
                            "confirmed",
                            "completed",
                            "cancelled",
                          ].includes(booking.status) && booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.selectedTime).toLocaleDateString(
                          "mn-MN"
                        )}{" "}
                        {new Date(booking.selectedTime).toLocaleTimeString(
                          "mn-MN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Өмнөх
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="w-9 p-0"
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Дараах
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <BookingCalendar
        company={company}
        selectedEmployee={selectedEmployee}
        bookings={displayBookings}
      />
    </div>
  );
}
