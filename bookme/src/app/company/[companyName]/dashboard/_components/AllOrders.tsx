"use client";

import { useEffect, useState } from "react";
import { Company, Booking } from "../../_components/CompanyTypes";
import { api } from "@/axios";
import { toast } from "sonner";
import { isToday, isThisWeek, isThisMonth, isPast } from "date-fns";
import {
  ShoppingCart,
  Check,
  Clock,
  AlertCircle,
  Search,
  ChevronDown,
  Eye,
  X,
  MoreHorizontal,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const ITEMS_PER_PAGE = 10;

type AllOrdersPageProps = {
  company: Company;
};

export function AllOrdersPage({ company }: AllOrdersPageProps) {
  const [orders, setOrders] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!company?._id) return;
        const res = await api.get(`/order/company/${company._id}`);
        setOrders(res.data.bookings);
      } catch (err) {
        toast.error("Захиалгын мэдээлэл татаж чадсангүй");
        console.error(err);
      }
    };
    fetchOrders();
  }, [company]);

  const filteredOrders = orders.filter((o) => {
    const date = new Date(o.selectedTime);
    const isFuture = date.getTime() >= new Date().getTime();
    const matchesSearch =
      o.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
      o.employee?.employeeName?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "past") return o.status === "confirmed" && isPast(date);
    if (!isFuture) return false;

    if (selectedDate) {
      const selected = new Date(selectedDate);
      const orderDate = new Date(o.selectedTime);
      const sameDay = 
        orderDate.getFullYear() === selected.getFullYear() &&
        orderDate.getMonth() === selected.getMonth() &&
        orderDate.getDate() === selected.getDate();

      if (!sameDay) return false;
    }

    switch (filter) {
      case "all":
        return ["confirmed", "cancelled"].includes(o.status);
      case "today":
        return ["confirmed", "cancelled"].includes(o.status) && isToday(date);
      case "week":
        return (
          ["confirmed", "cancelled"].includes(o.status) &&
          isThisWeek(date, { weekStartsOn: 1 })
        );
      case "month":
        return (
          ["confirmed", "cancelled"].includes(o.status) && isThisMonth(date)
        );
      case "confirmed":
      case "cancelled":
      case "pending":
        return o.status === filter;
      default:
        return true;
    }
  });

  const handleCancel = async (orderId: string) => {
    try {
      const res = await api.delete(`/order/${orderId}`);
      toast.success("Захиалгыг цуцаллаа");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (err) {
      toast.error("Цуцалж чадсангүй");
      console.error(err);
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: {
        label: "Батлагдсан",
        className: "bg-green-50 text-green-700 border-green-200",
        dot: "bg-green-500",
      },
      pending: {
        label: "Хүлээгдэж буй",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        dot: "bg-yellow-500",
      },
      cancelled: {
        label: "Цуцлагдсан",
        className: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("mn-MN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN").format(price) + "₮";
  };

  const filters = [
    { value: "all", label: "Бүгд", count: orders.length },
    {
      value: "today",
      label: "Өнөөдөр",
      count: orders.filter((o) => isToday(new Date(o.selectedTime))).length,
    },
    {
      value: "week",
      label: "Энэ долоо хоног",
      count: orders.filter((o) =>
        isThisWeek(new Date(o.selectedTime), { weekStartsOn: 1 })
      ).length,
    },
    {
      value: "confirmed",
      label: "Батлагдсан",
      count: orders.filter((o) => o.status === "confirmed").length,
    },
    {
      value: "pending",
      label: "Хүлээгдэж буй",
      count: orders.filter((o) => o.status === "pending").length,
    },
    {
      value: "cancelled",
      label: "Цуцлагдсан",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  const stats = [
    {
      title: "Нийт захиалга",
      value: filteredOrders.length,
      change: "+12%",
      trend: "up",
      icon: ShoppingCart,
      color: "blue",
    },
    {
      title: "Батлагдсан",
      value: "85%",
      change: "+8%",
      trend: "up",
      icon: Check,
      color: "green",
    },
    {
      title: "Хүлээгдэж буй",
      value: orders.filter((o) => o.status === "pending").length,
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Цуцлагдсан",
      value: "3%",
      change: "-2%",
      trend: "down",
      icon: AlertCircle,
      color: "red",
    },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Захиалгууд</h1>
              <p className="text-gray-600 mt-1">
                Шүүлт хийж захиалгуудыг харах
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Popover>
  <PopoverTrigger asChild>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2">
      <CalendarIcon className="w-4 h-4" />
      Хугацаагаар шүүх
    </button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={(date) => {
        setSelectedDate(date);
        setFilter("all"); 
      }}
      initialFocus
    />
  </PopoverContent>
</Popover>
            </div>
            
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Хайлт хийх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === f.value
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === f.value
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const getColorClasses = (color: string) => {
              const colors = {
                blue: "bg-blue-50 text-blue-600 border-blue-100",
                green: "bg-green-50 text-green-600 border-green-100",
                yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
                red: "bg-red-50 text-red-600 border-red-100",
              };
              return colors[color as keyof typeof colors] || colors.blue;
            };

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border ${getColorClasses(
                  stat.color
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white">
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium mt-2 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? <span>↑</span> : <span>↓</span>}
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Захиалгын жагсаалт</h2>
            <p className="text-sm text-gray-500 mt-1">
              Шүүлтийн дагуу харуулж байна
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Үйлчлүүлэгч
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ажилтан
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Төлөв
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Цаг
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Үйлдэл
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {order.user?.username?.charAt(0) || "U"}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {order.user?.username || "—"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.employee?.employeeName || "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${statusConfig.dot}`}
                          ></div>
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(order.selectedTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150">
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.status === "confirmed" && (
                            <button
                              onClick={() => handleCancel(order._id)}
                              className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
                            >
                              Цуцлах
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Өмнөх
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Дараах
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
