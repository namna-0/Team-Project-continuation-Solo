"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Company, Employee, Booking } from "../../_components/CompanyTypes";

export function StaffOrdersList({
  company,
  selectedEmployee,
  getEmployeeBookings,
  handleEmployeeSelect,
}: {
  company: Company;
  selectedEmployee: Employee | null;
  getEmployeeBookings: (employeeId: string) => Booking[];
  handleEmployeeSelect: (employee: Employee) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ажилтнууд</CardTitle>
        <CardDescription>
          Ажилтан дээр дарж тухайн ажилтны захиалгуудыг календар дээр харах
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
  );
}
