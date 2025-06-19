"use client";

import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { ClipboardList, Scissors, Settings, Users } from "lucide-react";

type SideBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const Sidebar = ({ activeTab, setActiveTab }: SideBarProps) => {
  const { signOutCompany, company } = useCompanyAuth();

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6 flex flex-col justify-between fixed shadow-2xl opacity-80">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
            {company?.companyName}
          </h2>
          <p className="text-purple-200 text-sm">Удирдлагын самбар</p>
        </div>
        <nav className="space-y-3">
          {[
            {
              id: "bookings",
              icon: ClipboardList,
              label: "Захиалгууд",
              color: "from-pink-400 to-pink-600",
            },
            {
              id: "employees",
              icon: Users,
              label: "Ажилчид",
              color: "from-blue-400 to-blue-600",
            },

            {
              id: "settings",
              icon: Settings,
              label: "Тохиргоо",
              color: "from-orange-400 to-orange-600",
            },
          ].map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                activeTab === id
                  ? `bg-gradient-to-r ${color} shadow-lg transform scale-105`
                  : "hover:bg-purple-700/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-2 mt-6">
        <button
          onClick={signOutCompany}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Гарах
        </button>
        <button className="w-full bg-white border-[1px] py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-black">
          Буцах
        </button>
      </div>
    </aside>
  );
};
