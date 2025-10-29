import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ExperienceDetails() {
  const { id } = useParams();
  const [exp, setExp] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch experience details
  useEffect(() => {
    const fetchExp = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/experiences/${id}`);
        const data = await res.json();
        setExp(data);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };
    fetchExp();
  }, [id]);

  if (!exp) return <p className="text-center mt-10">Loading...</p>;

  // 🔹 Search handler (optional)
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    }
  };

  // 🔹 Confirm booking
  const handleConfirm = () => {
    navigate(`/checkout/${exp._id}`, {
      state: {
        exp,
        selectedDate,
        selectedTime,
        quantity,
        total: Number(exp.price) * quantity + 59,
      },
    });
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const dates =
    exp.availableDates && exp.availableDates.length > 0
      ? exp.availableDates
      : ["Oct 22", "Oct 23", "Oct 24", "Oct 25"];

  const times =
    exp.availableTimeSlots && exp.availableTimeSlots.length > 0
      ? exp.availableTimeSlots
      : ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"];

  const subtotal = exp.price * quantity;
  const total = subtotal + 59;

  return (
    <>
      {/* 🔹 Navbar + Search Section */}
      <div className="px-10 py-6 border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 ml-20">
            <img
              src="/logo.png"
              alt="Highway Delite Logo"
              className="h-12 w-35 "
            />
            {/* <span className="font-semibold text-lg">highway delite</span> */}
          </div>

          {/* Right: Search */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experiences"
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-64 focus:outline-none bg-gray-100"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 rounded-r-lg px-4 py-2 text-sm font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 🔹 Main Experience Section */}
      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2">
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-96 object-cover rounded-2xl mb-6"
          />

          <h1 className="text-2xl font-semibold mb-2">{exp.title}</h1>
          <p className="text-gray-600 mb-4">{exp.description}</p>

          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              <h2 className="font-semibold mb-2">Choose date</h2>
              <div className="flex gap-2 flex-wrap">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={`px-3 py-1 rounded border transition ${
                      selectedDate === d
                        ? "bg-yellow-400 text-black border-yellow-500"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h2 className="font-semibold mb-2">Choose time</h2>
              <div className="flex flex-wrap gap-2">
                {times.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(t)}
                    className={`px-3 py-1 rounded border text-sm transition ${
                      selectedTime === t
                        ? "bg-yellow-400 text-black border-yellow-500"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About Section */}
            <div>
              <h2 className="font-semibold mb-2">About</h2>
              <p className="bg-gray-100 p-2 rounded text-gray-600 text-sm">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Summary */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between mb-2">
            <span>Starts at</span>
            <span className="font-semibold">₹{exp.price}</span>
          </div>

          {/* Quantity Selection */}
          <div className="flex justify-between items-center mb-2">
            <span>Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 w-8 h-8 rounded-full text-lg font-bold hover:bg-gray-300"
              >
                −
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 w-8 h-8 rounded-full text-lg font-bold hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>₹59</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-2 rounded font-medium transition ${
              selectedDate && selectedTime
                ? "bg-yellow-500 text-black hover:bg-yellow-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
