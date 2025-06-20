"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/app/_providers/UserAuthProvider";
import { History, LogOutIcon, SquareUserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const params = useParams();
  const companyName = params?.companyName as string;

  useEffect(() => {
    if (!companyName) return;
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/company/name/${companyName}`);
        const logo = res.data.company?.companyLogo;
        if (logo) setCompanyLogo(logo);
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };
    fetchCompany();
  }, [companyName]);
  return (
    <>
      {" "}
      <nav className=" top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href={`/company/${companyName}`}
                className="text-lg font-bold"
              >
                {companyLogo && (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                )}
              </Link>
            </div>

            <div className=" flex items-center gap-4">
              <Link href={`/company/${companyName}`}>
                <Button className="relative bg-[#77b8fa] group w-[77px] h-10 px-6 py-2 rounded-full overflow-hidden text-white cursor-pointer">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#77b8fa] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  <span className="relative z-10">Буцах</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="relative bg-[#77b8fa] group w-[77px] h-10 px-6 py-2 rounded-full overflow-hidden text-white cursor-pointer">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#77b8fa] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  <span className="relative z-10"> Цэс</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="font-bold">
                    Хэрэглэгчийн хуудас
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/company/${companyName}/userprofile`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <SquareUserRound /> Нүүр хуудас
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/company/${companyName}/appointments`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <History />
                      Захиалгын түүх
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={signOut}
                  >
                    <LogOutIcon className="text-red-600" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
