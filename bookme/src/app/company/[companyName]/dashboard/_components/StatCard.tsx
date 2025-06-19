"use client";

import React from "react";

type StatCardProps = {
  icon: React.ElementType;
  label: string;
  value: number | string;
  gradient: string;
  iconBg: string;
};

export const StatCard = ({
  icon: Icon,
  label,
  value,
  gradient,
  iconBg,
}: StatCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-2xl ${iconBg} mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};
