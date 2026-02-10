import { QRCodeCanvas } from "qrcode.react";

const Ticket = ({ booking }) => {
  // 1. Safety Check: If booking is missing, don't crash the app
  if (!booking) return null;

  const isValid = booking.status === "valid";

  // 2. Safe Date Parsing
  const eventDate = booking.eventDate ? new Date(booking.eventDate) : null;
  const formattedDate =
    eventDate && !isNaN(eventDate.getTime())
      ? eventDate.toLocaleDateString("en-PK", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  // 3. Safe Time Parsing (Crucial Fix)
  let formattedTime = "N/A";
  if (booking.eventTime) {
    const timeDate = new Date(`1970-01-01T${booking.eventTime}`);
    if (!isNaN(timeDate.getTime())) {
      formattedTime = timeDate
        .toLocaleTimeString("en-PK", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase();
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-300 flex flex-col shadow-sm">
      <div
        className={`p-5 ${isValid ? "bg-blue-700" : "bg-zinc-700"} text-white rounded-t-xl`}
      >
        <h3 className="font-bold text-base line-clamp-1 mb-1">
          {booking.eventTitle || "Untitled Event"}
        </h3>
        <div className="flex flex-col gap-2 text-blue-50 text-xs font-medium mt-2">
          <div className="flex items-center gap-3">
            <span>
              <strong>Date:</strong> {formattedDate}
            </span>
            <span>
              <strong>Time:</strong> {formattedTime}
            </span>
          </div>
          <div>
            <strong>Venue:</strong> {booking.eventLocation || "TBA"}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border-b">
        <div className="border border-gray-300 bg-white p-2 rounded-lg">
          {/* Ensure value is never undefined */}
          <QRCodeCanvas
            value={booking.bookingId || "error"}
            size={140}
            level="H"
          />
        </div>
        <p className="mt-4 text-[10px] text-gray-500 font-mono text-center break-all">
          ID: {booking.bookingId}
        </p>
      </div>

      <div
        className={`p-3 text-center rounded-b-xl ${isValid ? "bg-green-50" : "bg-red-50"}`}
      >
        <span
          className={`px-4 py-1 rounded-full text-xs font-bold uppercase border ${
            isValid
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-red-100 text-red-700 border-red-300 line-through"
          }`}
        >
          {isValid ? "Active Ticket" : "Already Used"}
        </span>
      </div>
    </div>
  );
};

export default Ticket;
