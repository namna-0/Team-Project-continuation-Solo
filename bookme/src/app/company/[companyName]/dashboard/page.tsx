"use client";

import {
  Calendar,
  Users,
  DollarSign,
  Star,
  Plus,
  Settings,
  Scissors,
  ClipboardList,
  TimerReset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/axios";
import { useParams } from "next/navigation";

interface Booking {
  _id: string;
  customerName: string;
  serviceName: string;
  time: string;
}

interface Employee {
  _id: string;
  employeeName: string;
  description: string;
  profileImage: string;
}

interface Service {
  _id: string;
  name: string;
  price: number;
}

interface Company {
  _id: string;
  companyName: string;
  employees: Employee[];
  services: Service[];
  bookings: Booking[];
}

const Sidebar = () => (
  <aside className="w-64 min-h-screen bg-white border-r p-6 flex flex-col justify-between fixed">
    <div>
      <nav className="space-y-4 mt-[100px] justify-start">
        <TabsList className="flex flex-col w-full gap-2">
          <TabsTrigger value="bookings" className="justify-start">
            <ClipboardList className="w-4 h-4 mr-2" /> Захиалгууд
          </TabsTrigger>
          <TabsTrigger value="employees" className="justify-start">
            <Users className="w-4 h-4 mr-2" /> Ажилчид
          </TabsTrigger>
          <TabsTrigger value="services" className="justify-start">
            <Scissors className="w-4 h-4 mr-2" /> Үйлчилгээнүүд
          </TabsTrigger>
          <TabsTrigger value="settings" className="justify-start">
            <Settings className="w-4 h-4 mr-2" /> Тохиргоо
          </TabsTrigger>
        </TabsList>
      </nav>
    </div>
    <Button className="w-full bg-[#007FFF] hover:bg-[#0067cc] h-12 text-white font-semibold rounded-lg">
      Гарах
    </Button>
  </aside>
);

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <Card className="w-full">
    <CardContent className="flex items-center gap-4 p-6">
      <div className={`p-3 rounded-full ${color} text-white`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { companyName } = useParams<{ companyName: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/company/${companyName}`);
        if (res.data && res.data.company) {
          setCompany(res.data.company);
        } else {
          toast.error("Компани олдсонгүй");
        }
      } catch (err) {
        console.error("Алдаа:", err);
        toast.error("Компаний мэдээлэл авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    if (companyName) fetchCompany();
  }, [companyName]);

  return (
    <Tabs defaultValue="bookings" className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Салон Хяналтын Самбар
            </h1>
            <p className="text-gray-500">
              Захиалга болон үйлчилгээний мэдээлэл
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Calendar}
            label="Өнөөдрийн захиалга"
            value={company?.bookings.length ?? 0}
            color="bg-pink-500"
          />
          <StatCard
            icon={DollarSign}
            label="Нийт үйлчилгээ"
            value={company?.services.length ?? 0}
            color="bg-yellow-500"
          />
          <StatCard
            icon={Users}
            label="Ажилчид"
            value={company?.employees.length ?? 0}
            color="bg-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <TabsContent value="bookings">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Захиалгууд</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Шинэ захиалга
              </Button>
            </div>
            <ul className="space-y-2">
              {company?.bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="border p-3 rounded-lg bg-gray-100 text-sm"
                >
                  <strong>{booking.customerName}</strong> —{" "}
                  {booking.serviceName}{" "}
                  <span className="text-gray-500">({booking.time})</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="employees">
            <h2 className="text-xl font-bold mb-2">Ажилчид</h2>
            <ul className="space-y-2">
              {company?.employees.map((emp) => (
                <li key={emp._id} className="flex items-center gap-3">
                  <img
                    src={emp.profileImage}
                    alt={emp.employeeName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{emp.employeeName}</p>
                    <p className="text-sm text-gray-500">{emp.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="services">
            <h2 className="text-xl font-bold mb-2">Үйлчилгээнүүд</h2>
            <ul className="space-y-2">
              {company?.services.map((srv) => (
                <li key={srv._id} className="p-3 border rounded-lg bg-gray-100">
                  <div className="flex justify-between">
                    <p>{srv.name}</p>
                    <span className="text-gray-600">₮{srv.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-xl font-bold mb-2">Тохиргоо</h2>
            <p className="text-gray-500">Энд тохиргооны хэсэг орно.</p>
          </TabsContent>
        </div>
      </main>
    </Tabs>
  );
}
