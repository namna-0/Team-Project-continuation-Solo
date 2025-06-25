import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmployeeAddSection } from "./EmployeeAddSection";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { EmployeeCard } from "./EmployeeCard";

export function EmployeesPage() {
  const { company } = useCompanyAuth();
  console.log(company?.employees[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage your company employees</p>
        </div>
        <EmployeeAddSection />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search employeesss..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {company?.employees.map((employee) => (
          <div key={employee._id}>
            <EmployeeCard employee={employee} />
          </div>
        ))}
      </div>
    </div>
  );
}
