"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Employee } from "@/app/signup/_components/Types";
export const EmployeeCard = ({ employee }: Employee) => {
  console.log(employee);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {employee.employeeName}
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {employee.availability}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{employee.role}</span>
            <Badge
              variant={employee.status === "Active" ? "default" : "secondary"}
            >
              {employee.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
