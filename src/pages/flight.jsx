import { useState } from "react";
import axios from "axios";
import { flightsData } from "../constants/flightsData";
import { Search } from "lucide-react";
import StatusPopup from "./components/statusPopup";
const Flight = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // popup state
  const [statusPopup, setStatusPopup] = useState({
    open: false,
    type: "success", // "success" | "error"
    title: "",
    message: "",
  });

  const openModal = (flight) => {
    setSelectedFlight(flight);
  };

  const closeModal = () => {
    if (bookingLoading) return; // prevent closing in middle of API
    setSelectedFlight(null);
  };

  const handleBook = async (flightId) => {
    try {
      setBookingLoading(true);

      // 🔹 Replace URL with your real backend endpoint
      const response = await axios.post("/api/bookings/flight", {
        flightId,
      });

      alert(
        response?.data?.message || "Flight booking request sent successfully!"
      );
      closeModal();
    } catch (error) {
      console.error("Flight booking error:", error);
      alert("Error while booking flight. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleStatusClose = () => {
    setStatusPopup((prev) => ({ ...prev, open: false }));
  };

  // 🔍 Filter flights based on search term (name + desc)
  const filteredFlights = flightsData.filter((flight) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      flight.name.toLowerCase().includes(q) ||
      flight.desc.toLowerCase().includes(q)
    );
  });

  const testingStatus = () => {
    const isSuccess = true;
    if (isSuccess) {
      setStatusPopup({
        open: true,
        type: "success",
        title: "Booking request sent",
        message:
          "Your flight ticket booking request was submitted successfully. We’ll notify you once it is confirmed.",
      });
      closeModal();
    } else {
      setStatusPopup({
        open: true,
        type: "error",
        title: "Booking failed",
        message:
          "Something went wrong while processing your booking. Please try again in a few moments.",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-8 pb-8">
      {/* Fixed Header */}
      <div className="fixed top-0 left-[252px] right-0 z-20 bg-slate-200 px-8 py-3 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-900">
          Flights
        </h1>
        <p className="text-sm text-indigo-600 mt-1 font-medium">
          Browse available flights and book your next journey instantly.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 max-w-xl">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
          Search Flights
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by airline, route, or details..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500"
          />

          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Cards Grid */}
      {filteredFlights.length === 0 ? (
        <div className="text-sm text-slate-500">
          No flights found for{" "}
          <span className="font-semibold text-slate-700">“{searchTerm}”</span>.
          Try a different keyword.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="text-left bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={flight.img}
                  alt={flight.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold text-slate-800 line-clamp-1">
                    {flight.name}
                  </h2>

                  <span
                    className={
                      `inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ` +
                      (flight.rating >= 4
                        ? "bg-green-100 text-green-700"
                        : flight.rating >= 3
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700")
                    }
                  >
                    ⭐ {flight.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {flight.desc}
                </p>
                <button
                  type="button"
                  onClick={() => openModal(flight)}
                  className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors inline-block"
                >
                  View details & book →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedFlight && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={selectedFlight.img}
                alt={selectedFlight.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {selectedFlight.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Review flight details and proceed with secure booking.
                  </p>
                </div>

                <span className="inline-flex items-center text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                  ⭐ {selectedFlight.rating}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                {selectedFlight.desc}
              </p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={bookingLoading}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    // handleBook(selectedFlight.id)
                    testingStatus()
                  }
                  disabled={bookingLoading}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                  {bookingLoading ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Status Popup (success / error) */}
      <StatusPopup
        open={statusPopup.open}
        type={statusPopup.type}
        title={statusPopup.title}
        message={statusPopup.message}
        onClose={handleStatusClose}
      />
    </div>
  );
};

export default Flight;
