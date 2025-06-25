"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Search, ShoppingCart } from "lucide-react";
import { Company, Booking } from "../../_components/CompanyTypes";
import { api } from "@/axios";
import { toast } from "sonner";
import { isToday, isThisWeek, isThisMonth, isPast } from "date-fns";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "in-progress":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredOrders = orders.filter((o) => {
    const date = new Date(o.selectedTime);
    const isFuture = date.getTime() >= new Date().getTime();
    const matchesSearch =
      o.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
      o.employee?.employeeName?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "past") {
      return o.status === "confirmed" && isPast(date);
    }

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
        return o.status === "confirmed";
      case "cancelled":
        return o.status === "cancelled";
      case "pending":
        return o.status === "pending";
      default:
        return true;
    }
  });

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

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Хайлт..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[200px]"
          />

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Шүүлт" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүгд</SelectItem>
              <SelectItem value="today">Өнөөдөр</SelectItem>
              <SelectItem value="week">7 хоног</SelectItem>
              <SelectItem value="month">Энэ сар</SelectItem>
              <SelectItem value="confirmed">Баталгаажсан</SelectItem>
              <SelectItem value="cancelled">Цуцлагдсан</SelectItem>
              <SelectItem value="past">Дууссан</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Өдөр сонгох"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Захиалгын тоо</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              {selectedDate
                ? `Сонгосон өдөрт`
                : filter === "all"
                ? "Нийт бүх захиалга"
                : "Шүүлттэй захиалгууд"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Захиалгын жагсаалт</CardTitle>
          <CardDescription>
            {selectedDate
              ? `${format(selectedDate, "PPP")} өдөрт хамаарах захиалгууд`
              : "Шүүлтийн дагуу харуулж байна"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Үйлчлүүлэгч</TableHead>
                <TableHead>Ажилтан</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Цаг</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.user?.username || "—"}</TableCell>
                  <TableCell>{order.employee?.employeeName || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.selectedTime).toLocaleString("mn-MN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-end mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
