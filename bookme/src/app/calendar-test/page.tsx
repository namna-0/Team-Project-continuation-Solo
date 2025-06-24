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
      return "#1a73e8"; // Google Blue
    case "cancelled":
      return "#ea4335"; // Google Redsss
    case "completed":
      return "#34a853"; // Google Green
    case "pending":
      return "#fbbc04"; // Google Yellow
    default:
      return "#9aa0a6"; // Google Gray
  }
};

const getEventStyle = (status: string) => {
  const baseColor = getEventColor(status);
  return {
    backgroundColor: baseColor,
    borderColor: baseColor,
    color: "#ffffff",
  };
};

const formatSelectedTime = (date: Date): string => {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${weekday}, ${month} ${day}, ${year} at ${time}`;
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
  const [currentView, setCurrentView] = useState("timeGridWeek");

  useEffect(() => {
    const calendarEvents: EventInput[] = bookings.map((booking) => {
      const duration = booking.employee?.duration
        ? parseInt(booking.employee.duration)
        : 60;

      const style = getEventStyle(booking.status);

      return {
        id: booking._id,
        title: `${booking.user?.username || "Guest"}`,
        start: new Date(booking.selectedTime),
        end: new Date(
          new Date(booking.selectedTime).getTime() + duration * 60 * 1000
        ),
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        textColor: style.color,
        extendedProps: {
          employee: booking.employee?.employeeName || "—",
          status: booking.status,
          customerName: booking.user?.username || "Guest",
        },
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

        const style = getEventStyle("confirmed");
        const newEvent: EventInput = {
          id: response.data.order._id,
          title: "Guest",
          start: selectedSlot,
          end: new Date(selectedSlot.getTime() + durationInMinutes * 60 * 1000),
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          textColor: style.color,
          extendedProps: {
            employee: selectedEmployee.employeeName,
            status: "confirmed",
            customerName: "Guest",
          },
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

  const statusLegend = [
    { status: "pending", label: "Хүлээгдэж буй", color: "#fbbc04" },
    { status: "confirmed", label: "Баталгаажсан", color: "#1a73e8" },
    { status: "completed", label: "Дууссан", color: "#34a853" },
    { status: "cancelled", label: "Цуцлагдсан", color: "#ea4335" },
  ];

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-medium text-gray-900">
                    {selectedEmployee
                      ? selectedEmployee.employeeName
                      : "Бүх ажилтнууд"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Цаг захиалгын календар
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleViewChange("dayGridMonth")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentView === "dayGridMonth"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Сар
              </button>
              <button
                onClick={() => handleViewChange("timeGridWeek")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentView === "timeGridWeek"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                7 хоног
              </button>
              <button
                onClick={() => handleViewChange("timeGridDay")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentView === "timeGridDay"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Өдөр
              </button>
            </div>
          </div>

          {/* Status Legend */}
          <div className="mt-4 flex flex-wrap gap-6">
            {statusLegend.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "", // Hide default view buttons since we have our own
            }}
            buttonText={{
              today: "Өнөөдөр",
              month: "Сар",
              week: "7 хоног",
              day: "Өдөр",
            }}
            view={currentView}
            editable={false}
            selectable={!!selectedEmployee}
            nowIndicator={true}
            selectMirror={true}
            dayMaxEvents={false}
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            slotDuration="00:30:00"
            events={events}
            dateClick={selectedEmployee ? handleDateClick : undefined}
            height="auto"
            contentHeight="600px"
            locale="en"
            firstDay={1}
            eventContent={(arg) => (
              <div className="px-2 py-1 h-full overflow-hidden">
                <div className="text-xs font-semibold truncate mb-1">
                  {arg.event.extendedProps.customerName}
                </div>
                <div className="text-xs opacity-90 truncate">
                  {arg.event.extendedProps.employee}
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {arg.event.start?.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            )}
            eventClassNames="rounded-md border-l-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            dayHeaderClassNames="bg-gray-50 border-b border-gray-200 py-3 text-center text-sm font-medium text-gray-700"
            slotLabelClassNames="text-xs text-gray-500 pr-2"
            viewClassNames="p-4"
            // Custom CSS for Google Calendar styling
            eventDidMount={(info) => {
              // Add custom styling to match Google Calendar
              info.el.style.border = "none";
              info.el.style.borderRadius = "4px";
              info.el.style.fontSize = "12px";
              info.el.style.fontWeight = "500";
            }}
          />
        </div>
      </div>

      {/* Google Calendar Style Modal */}
      {dialogOpen && selectedSlot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Цаг захиалга үүсгэх
              </h2>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Employee Info */}
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {selectedEmployee?.employeeName}
                  </div>
                  <div className="text-xs text-gray-500">Ажилтан</div>
                </div>
              </div>

              {/* Time Info */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatSelectedTime(selectedSlot)}
                  </div>
                  <div className="text-xs text-gray-500">Сонгосон цаг</div>
                </div>
              </div>

              {/* Duration Info */}
              <div className="text-xs text-gray-500 px-3">
                Үргэлжлэх хугацаа: {selectedEmployee?.duration || 60} минут
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Цуцлах
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
