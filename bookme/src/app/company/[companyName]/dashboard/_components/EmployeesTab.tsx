"use client";

import { Clock, Star } from "lucide-react";
import { Company, Employee } from "../../_components/CompanyTypes";
import { useState } from "react";

interface EmployeesTabProps {
  company: Company;
}

export const EmployeesTab = ({ company }: EmployeesTabProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const bookingsForSelected = company.bookings?.filter(
    (b) => b.employee._id === selectedEmployee?._id
  );
  return (
    <div className="flex gap-8">
      <div className="w-1/2 max-h-[75vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Манай баг</h2>
        <div className="grid gap-6">
          {company.employees?.map((e) => (
            <div
              key={e._id}
              onClick={() => setSelectedEmployee(e)}
              className={`cursor-pointer bg-white rounded-3xl p-6 shadow-xl transition-all duration-300 transform
                hover:shadow-2xl hover:-translate-y-2
                ${
                  selectedEmployee?._id === e._id ? "ring-4 ring-blue-400" : ""
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-1">
                  <img
                    src={
                      e.profileImage ||
                      "https://images.unsplash.com/photo-1494790108755-2616c9c9b7d2?w=64&h=64&fit=crop"
                    }
                    className="w-full h-full rounded-full object-cover"
                    alt={e.employeeName}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg">
                    {e.employeeName}
                  </h4>
                  <p className="text-gray-600 text-sm">{e.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-500">
                      4.8 (124 үнэлгээ)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 max-h-[75vh] overflow-y-auto bg-white rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {selectedEmployee
            ? `${selectedEmployee.employeeName} -ийн захиалгууд`
            : "Ажилтан сонгоно уу"}
        </h2>

        {!selectedEmployee && (
          <p className="text-gray-500">Зүүн талд ажилтан дээр дарна уу</p>
        )}

        {selectedEmployee && (
          <>
            {bookingsForSelected?.length === 0 && (
              <p className="text-gray-500">
                Энэ ажилтанд захиалга байхгүй байна.
              </p>
            )}
            <div className="space-y-4">
              {bookingsForSelected?.map((b) => (
                <div
                  key={b._id}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-700">
                        Хэрэглэгч: {b.user.username}
                      </p>
                      <p className="text-sm text-gray-500">
                        Захиалгын статус:{" "}
                        <span
                          className={`font-semibold ${
                            b.status === "confirmed"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-start gap-1 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{b.selectedTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
