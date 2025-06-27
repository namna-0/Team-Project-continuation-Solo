"use cleint";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";
import { EmploySearchCard } from "./EmploySearchCard";
import { Employee } from "../../_components/CompanyTypes";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSearchedEmployees: (employees: Employee[] | null) => void;
}

export const EmployeeSearchSection = ({
  setSearchedEmployees,
  searchValue,
  setSearchValue,
}: Props) => {
  const { company } = useCompanyAuth();

  const handleSearchEmploy = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredEmployees = company?.employees.filter((employee) =>
    employee.employeeName.toLowerCase().includes(searchValue)
  );

  return (
    <div className="flex items-center space-x-2 ">
      <div className="w-[20%] relative flex flex-col gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ажилтан хайх"
            className="pl-8 w-full"
            onChange={handleSearchEmploy}
          />
        </div>

        {searchValue && (
          <div className="absolute top-12 w-full p-2 rounded-2xl z-10 bg-[#f9f9f9] max-h-64 overflow-auto shadow-md">
            <div className="flex flex-col">
              {filteredEmployees?.length ? (
                filteredEmployees.map((employee) => (
                  <EmploySearchCard key={employee._id} employ={employee} />
                ))
              ) : (
                <div className="text-sm text-gray-500 p-2 text-center">
                  Үр дүн олдсонгүй
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
