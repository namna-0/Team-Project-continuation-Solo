"use client";

import { Clock } from "lucide-react";
import { Booking, Company } from "../../_components/CompanyTypes";

type BookingsTabProps = {
  company: Company;
};

export const BookingsTab = ({ company }: BookingsTabProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🗕️ Үнөөдрийн захиалгууд
      </h2>
      <div className="grid gap-4">
        {company.bookings?.map((b) => (
          <div
            key={b._id}
            className="bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300 border-2 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-800">{b.user.username}</h4>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{b.selectedTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
