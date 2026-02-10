import { Link } from "react-router";

const EventCard = ({ event }) => {
  // 1. Safety Guard
  if (!event) return null;

  // 2. Safe Date Parsing
  const eventDate = event.date ? new Date(event.date) : null;
  const formattedDate =
    eventDate && !isNaN(eventDate.getTime())
      ? eventDate.toLocaleDateString("en-PK", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Date TBA";

  // 3. Safe Time Parsing
  let formattedTime = "Time TBA";
  if (event.time) {
    const timeDate = new Date(`1970-01-01T${event.time}`);
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
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={event.image || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={event.title || "Event"}
        className="w-full h-48 object-cover bg-gray-100"
      />
      <div className="p-4">
        <h3 className="text-lg line-clamp-1 font-bold mb-2 text-gray-800">
          {event.title || "Untitled Event"}
        </h3>

        <div className="space-y-1 mb-4">
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span>📅</span> {formattedDate}
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span>⏰</span> {formattedTime}
          </p>
          <p className="text-gray-600 text-sm line-clamp-1 flex items-center gap-2">
            <span>📍</span> {event.location || "Location TBA"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-blue-700 font-bold">
            {event.price > 0 ? `Rs. ${event.price}` : "FREE"}
          </span>
          <Link
            to={`/event/${event.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
