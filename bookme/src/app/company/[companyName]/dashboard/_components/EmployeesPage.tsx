import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function EmployeesPage() {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      role: "Manager",
      status: "Active",
      email: "john@company.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Staff",
      status: "Active",
      email: "jane@company.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Staff",
      status: "Inactive",
      email: "mike@company.com",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage your company employees</p>
        </div>
        <Button className="bg-[#007FFF] hover:bg-[#007FFF]/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search employees..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {employee.name}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {employee.email}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{employee.role}</span>
                  <Badge
                    variant={
                      employee.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
