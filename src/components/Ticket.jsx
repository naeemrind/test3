// src/components/Ticket.jsx
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router";

const Ticket = ({ booking }) => {
  // Safety check: if booking is somehow undefined, return null to prevent crash
  if (!booking) return null;

  const isValid = booking.status === "valid";

  // 1. Format Date Safe Check
  let formattedDate = "N/A";
  if (booking?.eventDate) {
    try {
      formattedDate = new Date(booking.eventDate).toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      formattedDate = "Invalid Date";
    }
  }

  // 2. Format Time Safe Check
  let formattedTime = "N/A";
  if (booking?.eventTime) {
    try {
      formattedTime = new Date(`1970-01-01T${booking.eventTime}`)
        .toLocaleTimeString("en-PK", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase();
    } catch (e) {
      formattedTime = "Invalid Time";
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-300 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* 1. Header Section: Event Info */}
      <div
        className={`p-5 ${
          isValid ? "bg-blue-700" : "bg-zinc-700"
        } text-white rounded-t-xl`}
      >
        <h3 className="font-bold text-base line-clamp-1 mb-1 leading-normal">
          {booking?.eventTitle || "Event Deleted or Unavailable"}
        </h3>

        <div className="flex flex-col gap-2 text-blue-50 text-xs font-medium tracking-wider mt-2">
          <div className="flex items-center gap-3">
            <span>
              <strong>Date:</strong> {formattedDate}
            </span>
            <span>
              <strong>Time:</strong> {formattedTime}
            </span>
          </div>
          <div className="leading-relaxed">
            <strong>Venue:</strong> {booking?.eventLocation || "Location N/A"}
          </div>
        </div>
      </div>

      {/* 2. Body Section: QR Code */}
      <div className="bg-gray-50 p-6 flex flex-col items-center justify-center flex-1 border-b border-gray-200">
        <div className="border border-gray-300 bg-white p-2 rounded-lg">
          {booking?.bookingId ? (
            <QRCodeCanvas
              value={booking.bookingId}
              size={140}
              level={"H"} // High error correction
            />
          ) : (
            <div className="w-35 h-35 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              No ID
            </div>
          )}
        </div>

        <p className="mt-4 text-[10px] text-gray-500 font-mono text-center break-all">
          ID: {booking?.bookingId || "Unknown"}
        </p>
      </div>

      {/* 3. Footer Section: Status & Link */}
      <div className="flex bg-white">
        <div
          className={`flex-1 p-3 text-center border-r border-gray-100 ${
            isValid ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
              isValid
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-red-100 text-red-700 border-red-300 line-through"
            }`}
          >
            {isValid ? "Active" : "Used"}
          </span>
        </div>

        {/* Only show "View Event" link if we have an eventId */}
        {booking?.eventId && (
          <Link
            to={`/event/${booking.eventId}`}
            className="flex-1 p-3 text-center hover:bg-gray-50 text-blue-600 text-xs font-bold uppercase flex items-center justify-center"
          >
            View Event &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};

export default Ticket;
