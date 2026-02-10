import { Link } from "react-router";

const EventCard = ({ event }) => {
  // Safe Date Formatting
  const eventDate = event?.date ? new Date(event.date) : null;
  const isDateValid = eventDate && !isNaN(eventDate.getTime());

  const formattedDate = isDateValid
    ? eventDate.toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date N/A";

  // Safe Time Formatting (The Crash Fix)
  let formattedTime = "Time N/A";
  if (event?.time) {
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
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg line-clamp-1 font-bold mb-2 text-gray-800">
          {event.title}
        </h3>

        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center text-sm">
            <span>
              <strong>Date:</strong> {formattedDate} &nbsp;{" "}
              <strong>Time: </strong>
              {formattedTime}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm font-semibold text-green-700">
            <span>PKR {event.price}</span>
          </div>
        </div>

        <Link
          to={`/event/${event.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
