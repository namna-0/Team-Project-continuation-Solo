"use client";

import { useEffect, useState } from "react";
import { Company, Booking } from "../../_components/CompanyTypes";
import { api } from "@/axios";
import { toast } from "sonner";
import { isToday, isThisWeek, isThisMonth, isPast } from "date-fns";
import { OrderFilters } from "./OrderFilters";
import { OrderStats } from "./OrderStats";
import { OrderTable } from "./OrderTable";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Захиалгууд</h1>
          <p className="text-muted-foreground">Шүүлт хийж захиалгуудыг харах</p>
        </div>

        <OrderFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <OrderStats
        total={filteredOrders.length}
        selectedDate={selectedDate}
        filter={filter}
      />
      <OrderTable
        orders={paginatedOrders}
        selectedDate={selectedDate}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onCancel={handleCancel}
      />
    </div>
  );
}
