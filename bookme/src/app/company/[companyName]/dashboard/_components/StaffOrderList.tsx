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
import { Users } from "lucide-react";
import { Company, Employee, Booking } from "../../_components/CompanyTypes";

export function StaffOrdersList({
  company,
  selectedEmployee,
  displayBookings,
  getEmployeeBookings,
  handleEmployeeSelect,
  showAllBookings,
  currentPage,
  setCurrentPage,
  getStatusColor,
  itemsPerPage,
  onCancel,
}: {
  company: Company;
  selectedEmployee: Employee | null;
  displayBookings: Booking[];
  getEmployeeBookings: (employeeId: string) => Booking[];
  handleEmployeeSelect: (employee: Employee) => void;
  showAllBookings: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  getStatusColor: (status: string) => string;
  itemsPerPage: number;
  onCancel: (orderId: string) => void;
}) {
  const totalPages = Math.ceil(displayBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = displayBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
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
                      <TableCell>
                        {booking.status !== "cancelled" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onCancel(booking._id)}
                          >
                            Цуцлах
                          </Button>
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
    </>
  );
}
