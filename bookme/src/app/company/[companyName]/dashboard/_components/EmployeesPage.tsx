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

  const filteredEmployees = (searchedEmployees ?? company?.employees)
    ?.filter((employee) =>
      employee.employeeName
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .reverse();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header section with responsive layout */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ажилтан засварлах
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Энэ хэсэгт та компанийн ажилтнуудын мэдээллийг шинэчилж, өөрчлөх
            болон ажилтан устгах боломжтой.
          </p>
        </div>
        <div className="flex-shrink-0">
          <EmployeeAddSection />
        </div>
      </div>
      {/* Search section */}
      <div className="w-full">
        <EmployeeSearchSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSearchedEmployees={setSearchedEmployees}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {(searchedEmployees ?? company?.employees)
          ?.filter(
            (employee) =>
              employee.employeeName ??
              "".toLowerCase().includes(searchValue.toLowerCase())
          )
          .reverse()
          .map((employee) => (
            <EmployeeCard
              key={employee._id}
              employee={employee}
              getCompanyAction={getCompany}
            />
          ))}

      {/* Employee cards grid - fully responsive */}
      <div className="w-full">
        {filteredEmployees && filteredEmployees.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                getCompanyAction={getCompany}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center min-h-[200px] text-center">
            <div className="space-y-2">
              <div className="text-muted-foreground text-lg">
                Үр дүн олдсонгүй
              </div>
              <p className="text-sm text-muted-foreground">
                Өөр хайлтын үг ашиглаж үзнэ үү
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}