"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
  EventDropArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

export default function BookingCalendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const title = prompt("Захиалгын нэр оруулна уу:");
    if (title) {
      const newEvent: EventInput = {
        title,
        start: arg.date,
        end: new Date(arg.date.getTime() + 60 * 60 * 1000),
        allDay: false,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleEventDrop = (arg: EventDropArg) => {
    const updated = events.map((event) =>
      event.title === arg.event.title
        ? { ...event, start: arg.event.start, end: arg.event.end }
        : event
    );
    setEvents(updated);
  };

  const handleEventResize = (arg: EventResizeDoneArg) => {
    const updated = events.map((event) =>
      event.title === arg.event.title
        ? { ...event, start: arg.event.start, end: arg.event.end }
        : event
    );
    setEvents(updated);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow rounded-lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        nowIndicator={true}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        events={events}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        height="auto"
      />
    </div>
  );
}
