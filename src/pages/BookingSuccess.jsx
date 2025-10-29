import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [refId, setRefId] = useState("");
  const [search, setSearch] = useState("");

  // Generate random booking reference ID
  useEffect(() => {
    const randomId = "REF" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setRefId(randomId);
  }, []);

  // Get data from Checkout
  const { exp, quantity, total, selectedDate, selectedTime } = location.state || {};

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <>
      {/* ✅ NAVBAR (same as other pages) */}
      <div className="px-10 py-6 border-b bg-white flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer ml-20" onClick={() => navigate("/")}>
          <img
            src="/logo.png" // 🔁 replace with your actual logo file path
            alt="Highway Delite Logo"
            className="h-12 w-35"
          />
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiences"
            className="border border-gray-300 rounded-l-lg px-3 py-2 w-64 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 rounded-r-lg px-4 py-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* ✅ SUCCESS CONTENT */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
        {/* Green check icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Booking Confirmed
        </h1>

        <p className="text-gray-500 mb-1">Ref ID: {refId}</p>

        {exp && (
          <div className="text-gray-600 text-sm mt-3 mb-6 text-center">
            <p className="font-medium">{exp.title}</p>
            <p>Tickets: {quantity}</p>
            <p>Date: {selectedDate}</p>
            <p>Time: {selectedTime}</p>
            <p>Total Paid: ₹{total}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Back to Home
        </button>
      </div>
    </>
  );
}
