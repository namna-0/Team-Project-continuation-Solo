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
export const Navbar = () => {
  const { user, signOut } = useAuth();
  const params = useParams();
  const companyName = params?.companyName as string;

  return (
    <>
      {" "}
      <nav className=" top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
              >
                Nailsy
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="#home"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#services"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#about"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer">
                  {user?.username}
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
                  <Link href="/company/test-company/appointments">
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
