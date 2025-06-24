"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
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
    case "confirmed":
      return "#3b82f6";
    case "cancelled":
      return "#ef4444";
    case "completed":
      return "#22c55e";
    case "pending":
      return "#facc15";
    default:
      return "#6b7280";
  }
};

const formatSelectedTime = (date: Date): string => {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${weekday}, ${month}/${day}/${year}, ${hour}:${minute}`;
};

export default function BookingCalendar({
  company,
  selectedEmployee,
  bookings = [],
}: BookingCalendarProps) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const { company: loggedInCompany } = useCompanyAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  useEffect(() => {
    const calendarEvents: EventInput[] = bookings.map((booking) => {
      const duration = booking.employee?.duration
        ? parseInt(booking.employee.duration)
        : 60;

      return {
        id: booking._id,
        title: `${booking.employee?.employeeName || "—"} - ${
          booking.user?.username || "Guest"
        }`,
        start: new Date(booking.selectedTime),
        end: new Date(
          new Date(booking.selectedTime).getTime() + duration * 60 * 1000
        ),
        backgroundColor: getEventColor(booking.status),
        borderColor: getEventColor(booking.status),
      };
    });

    setEvents(calendarEvents);
  }, [bookings]);

  const handleDateClick = (arg: DateClickArg) => {
    if (!selectedEmployee) {
      toast.error("Ажилтан сонгогдоогүй байна.");
      return;
    }
    setSelectedSlot(arg.date);
    setDialogOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedEmployee || !selectedSlot || !loggedInCompany?._id) {
      toast.error("Мэдээлэл дутуу байна.");
      return;
    }

    const formattedSelectedTime = formatSelectedTime(selectedSlot);

    try {
      const response = await api.post("/order", {
        company: loggedInCompany._id,
        employee: selectedEmployee._id,
        selectedTime: formattedSelectedTime,
        status: "confirmed",
      });

      if (response.status === 201) {
        toast.success("Захиалга амжилттай илгээгдлээ!");

        const durationInMinutes = selectedEmployee.duration
          ? Number(selectedEmployee.duration)
          : 60;

        const newEvent: EventInput = {
          id: response.data.order._id,
          title: `${selectedEmployee.employeeName} - Guest`,
          start: selectedSlot,
          end: new Date(selectedSlot.getTime() + durationInMinutes * 60 * 1000),
          backgroundColor: getEventColor("confirmed"),
          borderColor: getEventColor("confirmed"),
        };

        setEvents((prev) => [...prev, newEvent]);
        setDialogOpen(false);
        setSelectedSlot(null);
      }
    } catch (error) {
      console.error("Захиалга илгээхэд алдаа:", error);
      toast.error("Захиалга илгээхэд алдаа гарлаа");
    }
  };

  const handleCancelBooking = () => {
    setDialogOpen(false);
    setSelectedSlot(null);
  };

  return (
    <>
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
          height="auto"
          locale="en"
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
      {dialogOpen && selectedSlot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Цаг захиалга баталгаажуулах
            </h2>
            <p className="mb-2">
              Ажилтан: <b>{selectedEmployee?.employeeName}</b>
            </p>
            <p className="mb-4">
              Сонгосон цаг: <b>{formatSelectedTime(selectedSlot)}</b>
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCancelBooking}
              >
                Болих
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleConfirmBooking}
              >
                Баталгаажуулах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
