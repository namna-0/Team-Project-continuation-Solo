"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { useEffect, useState } from "react";
import { CompanyLocationEdit } from "./CompanyLocationEdit";

export const CompanyLocationGetData = () => {
  const { company } = useCompanyAuth();

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (company?.lat && company?.lng) {
      setSelectedPosition({
        lat: company.lat,
        lng: company.lng,
      });
    }
  }, [company]);

  if (!selectedPosition) {
    return <Skeleton className="w-full h-[500px] rounded-full " />;
  }

  return (
    <div>
      <CompanyLocationEdit
        companyId={company?._id}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
      />
    </div>
  );
};
