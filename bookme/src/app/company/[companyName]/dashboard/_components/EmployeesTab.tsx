"use client";

import { Star } from "lucide-react";
import { Company } from "../../_components/CompanyTypes";

interface EmployeesTabProps {
  company: Company;
}

export const EmployeesTab = ({ company }: EmployeesTabProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Манай баг</h2>
      <div className="grid gap-6">
        {company.employees?.map((e) => (
          <div
            key={e._id}
            className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
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
  );
};
