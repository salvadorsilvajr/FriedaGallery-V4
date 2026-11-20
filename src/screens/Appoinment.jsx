import React, { useState } from "react";

const TIME_SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00"];

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Build standardized event details and timestamps
  const getEventDetails = () => {
    const start = new Date(`${selectedDate}T${selectedTime}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1-hour default

    return {
      title: `Appointment with ${name || "Client"}`,
      description: notes || "Scheduled via web booking portal.",
      location: "Google Meet / Online",
      start,
      end,
    };
  };

  // Format date into YYYYMMDDTHHmmSSZ (used by Google & .ics)
  const formatCompactUTC = (date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  // 1. Google Calendar URL
  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return "#";
    const { title, description, location, start, end } = getEventDetails();

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatCompactUTC(start)}/${formatCompactUTC(end)}`,
      details: description,
      location,
    });

    return `https://google.com{params.toString()}`;
  };

  // 2. Outlook Web URL
  const getOutlookCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return "#";
    const { title, description, location, start, end } = getEventDetails();

    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: title,
      startdt: start.toISOString(),
      enddt: end.toISOString(),
      body: description,
      location,
    });

    return `https://live.com{params.toString()}`;
  };

  // 3. Apple Calendar / Universal .ics File Download
  const handleDownloadICS = () => {
    if (!selectedDate || !selectedTime) return;
    const { title, description, location, start, end } = getEventDetails();

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BookingApp//Appointment//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@bookingapp.local`,
      `DTSTAMP:${formatCompactUTC(new Date())}`,
      `DTSTART:${formatCompactUTC(start)}`,
      `DTEND:${formatCompactUTC(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "appointment.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    setIsBooked(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Book an Appointment
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Select a date and time slot below.
      </p>

      {!isBooked ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Times
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                    selectedTime === time
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any details for our meeting..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Confirm Appointment
          </button>
        </form>
      ) : (
        <div className="text-center py-4 space-y-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Appointment Confirmed!
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {selectedDate} at {selectedTime}
            </p>
          </div>

          {/* Multi-Calendar Options */}
          <div className="pt-2 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Add to your calendar
            </p>

            {/* Google Calendar */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.22 1.18-3.24 0-5.99-2.19-6.97-5.13H1.01v3.14C3.05 21.2 7.24 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.03 14.04c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.18H1.01C.37 7.45 0 8.88 0 10.36s.37 2.91 1.01 4.18l4.02-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.79 0 3.41.62 4.68 1.82l3.51-3.51C18.07 1.19 15.3 0 12 0 7.24 0 3.05 2.8 1.01 6.82l4.02 3.14c.98-2.94 3.73-5.21 6.97-5.21z"
                />
              </svg>
              Google Calendar
            </a>

            {/* Outlook Web */}
            <a
              href={getOutlookCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors"
            >
              <svg
                className="w-4 h-4 text-[#0078D4]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
              Outlook Calendar
            </a>

            {/* Apple Calendar / .ics File */}
            <button
              type="button"
              onClick={handleDownloadICS}
              className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Apple Calendar (.ics)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsBooked(false)}
            className="text-sm text-gray-500 hover:text-gray-700 pt-2 inline-block"
          >
            Book another time
          </button>
        </div>
      )}
    </div>
  );
}
