"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
  EventDropArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import { toast } from "sonner";
import { api } from "@/axios";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import {
  Booking,
  Company,
} from "../company/[companyName]/_components/CompanyTypes";
import { employeeType } from "../company/[companyName]/order/page";

interface BookingCalendarProps {
  company?: Company;
  selectedEmployee?: employeeType | null;
  bookings?: Booking[];
}

const getEventColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "#fbbf24";
    case "confirmed":
      return "#3b82f6";
    case "completed":
      return "#10b981";
    case "cancelled":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

export default function BookingCalendar({
  company,
  selectedEmployee,
  bookings = [],
}: BookingCalendarProps) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const { company: loggedInCompany } = useCompanyAuth();

  useEffect(() => {
    const calendarEvents: EventInput[] = bookings.map((booking) => ({
      id: booking._id,
      title: `${booking.employee?.employeeName || "—"} - ${
        booking.user?.username || "Guest"
      }`,
      start: new Date(booking.selectedTime),
      end: new Date(new Date(booking.selectedTime).getTime() + 60 * 60 * 1000),
      backgroundColor: getEventColor(booking.status),
      borderColor: getEventColor(booking.status),
    }));
    setEvents(calendarEvents);
  }, [bookings]);

  const handleDateClick = async (arg: DateClickArg) => {
    const selectedTime = arg.date;

    if (!selectedEmployee || !loggedInCompany?._id) {
      toast.error("Ажилтан болон компанийн мэдээлэл дутуу байна.");
      return;
    }

    const orderData = {
      company: loggedInCompany._id,
      user: null,
      status: "pending",
      employee: selectedEmployee._id,
      selectedTime: selectedTime.toISOString(),
      customerName: "Гишүүнгүй хэрэглэгч",
      customerPhone: "00000000",
      notes: "",
    };

    try {
      const response = await api.post("/order", orderData);
      if (response.status === 201) {
        toast.success("Захиалга амжилттай үүсгэгдлээ!");

        const newEvent: EventInput = {
          id: response.data.order._id,
          title: `${selectedEmployee.employeeName} - Guest`,
          start: selectedTime,
          end: new Date(selectedTime.getTime() + 60 * 60 * 1000),
          backgroundColor: getEventColor("pending"),
          borderColor: getEventColor("pending"),
        };

        setEvents((prev) => [...prev, newEvent]);
      }
    } catch (error) {
      console.error("Автомат захиалга үүсгэхэд алдаа:", error);
      toast.error("Захиалга автоматаар үүсгэхэд алдаа гарлаа");
    }
  };

  const handleEventDrop = async (arg: EventDropArg) => {
    try {
      const bookingId = arg.event.id;
      const newStart = arg.event.start;

      await api.put(`/order/${bookingId}`, {
        selectedTime: newStart?.toISOString(),
      });

      toast.success("Захиалгын цаг шинэчлэгдлээ");
    } catch (error) {
      toast.error("Цаг шинэчлэхэд алдаа гарлаа");
      arg.revert();
    }
  };

  const handleEventResize = async (arg: EventResizeDoneArg) => {
    try {
      const bookingId = arg.event.id;
      const newEnd = arg.event.end;

      await api.put(`/order/${bookingId}`, {
        selectedTime: arg.event.start?.toISOString(),
        endTime: newEnd?.toISOString(),
      });

      toast.success("Захиалгын хугацаа өөрчлөгдлөө");
    } catch (error) {
      toast.error("Хугацаа өөрчлөхөд алдаа гарлаа");
      arg.revert();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {selectedEmployee
            ? `${selectedEmployee.employeeName}-ийн календар`
            : "Бүх ажилтнуудын календар"}
        </h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-400" />
            <span>Хүлээгдэж буй</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span>Баталгаажсан</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Дууссан</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>Цуцлагдсан</span>
          </div>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable
        selectable
        nowIndicator
        selectMirror
        dayMaxEvents
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:30:00"
        events={events}
        dateClick={selectedEmployee ? handleDateClick : undefined}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        height="auto"
        locale="mn"
        firstDay={1}
        eventContent={(arg) => (
          <div className="p-1 text-xs">
            <div className="font-semibold truncate">{arg.event.title}</div>
            <div className="text-xs opacity-75">
              {arg.event.start?.toLocaleTimeString("mn-MN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        )}
      />
    </div>
  );
}
