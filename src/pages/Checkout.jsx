import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { exp, selectedDate, selectedTime } = location.state || {};
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [promo, setPromo] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");

  const subtotal = exp ? exp.price * quantity : 0;
  const taxes = 59;
  const total = subtotal + taxes;

  const handlePay = async () => {
    if (!fullName || !email || !agree) {
      alert("Please fill all required fields and accept the terms.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        name: fullName,
        email,
        experience: exp?.title,
        date: selectedDate,
        time: selectedTime,
        quantity,
        total,
      });


      navigate("/booking-success", {
        state: { exp, quantity, total, selectedDate, selectedTime },
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <>
      {/* ✅ NAVBAR (same as ExperienceDetails / Home page) */}
      <div className="px-10 py-6 border-b bg-white flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 ml-20">
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

      {/* ✅ CHECKOUT MAIN CONTENT */}
      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - User Form */}
        <div className="lg:col-span-2 bg-gray-50 p-6 rounded-xl">
          <h1 className="text-xl font-semibold mb-4">Checkout</h1>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full name"
              className="border rounded px-3 py-2 w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded px-3 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Promo code"
              className="border rounded px-3 py-2 w-full"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button className="bg-black text-white px-4 rounded">Apply</button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              I agree to the terms and safety policy
            </span>
          </div>
        </div>

        {/* Right Section - Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Experience</span>
            <span>{exp?.title}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Date</span>
            <span>{selectedDate}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Time</span>
            <span>{selectedTime}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Qty</span>
            <span>{quantity}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>₹{taxes}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </>
  );
}
