"use client";
import { EmployeeAddSection } from "./EmployeeAddSection";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeeSearchSection } from "./EmployeeSearchSection";
import { useState } from "react";
import { Employee } from "../../_components/CompanyTypes";

export function EmployeesPage() {
  const { company, getCompany } = useCompanyAuth();
  const [searchedEmployees, setSearchedEmployees] = useState<Employee[] | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="space-y-6 w-full h-full min-h-[calc(100vh-80px)]">
      <div className="w-full flex items-center justify-between p-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Ажилтан засварлах
          </h2>
          <p className="text-muted-foreground">
            Энэ хэсэгт та компанийн ажилтнуудын мэдээллийг шинэчилж, өөрчлөх
            болон ажилтан устгах боломжтой.
          </p>
        </div>
        <EmployeeAddSection />
      </div>

      <EmployeeSearchSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchedEmployees={setSearchedEmployees}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {(searchedEmployees ?? company?.employees)
          ?.filter((employee) =>
            employee.employeeName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          .reverse()
          .map((employee) => (
            <EmployeeCard
              key={employee._id}
              employee={employee}
              getCompanyAction={getCompany}
            />
          ))}

        {(searchedEmployees ?? company?.employees)?.filter((employee) =>
          employee.employeeName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ).length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              Үр дүн олдсонгүй
            </div>
          )}
      </div>
    </div>
  );
}
