import { useState } from "react";
import axios from "axios";

export default function AddExperience() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  // ✅ Get base URL from environment variable
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleAddDate = () => {
    if (dateInput && !availableDates.includes(dateInput)) {
      setAvailableDates([...availableDates, dateInput]);
      setDateInput("");
    }
  };

  const handleAddTime = () => {
    if (timeInput && !availableTimeSlots.includes(timeInput)) {
      setAvailableTimeSlots([...availableTimeSlots, timeInput]);
      setTimeInput("");
    }
  };

  const handleRemoveDate = (date) => {
    setAvailableDates(availableDates.filter((d) => d !== date));
  };

  const handleRemoveTime = (time) => {
    setAvailableTimeSlots(availableTimeSlots.filter((t) => t !== time));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (availableDates.length === 0 || availableTimeSlots.length === 0) {
      alert("Please add at least one available date and time slot.");
      return;
    }

    const newExperience = {
      title,
      location,
      description,
      price,
      image,
      availableDates,
      availableTimeSlots,
    };

    try {
      // ✅ Use environment variable instead of hardcoded localhost
      await axios.post(`${BASE_URL}/api/experiences`, newExperience);

      alert("✅ Experience added successfully!");
      // Reset form
      setTitle("");
      setLocation("");
      setDescription("");
      setPrice("");
      setImage("");
      setAvailableDates([]);
      setAvailableTimeSlots([]);
    } catch (error) {
      console.error("❌ Error adding experience:", error);
      alert("❌ Failed to add experience. Please check your backend connection.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Add New Experience
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="border rounded px-3 py-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="border rounded px-3 py-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="border rounded px-3 py-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border rounded px-3 py-2 w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border rounded px-3 py-2 w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* ✅ Available Dates */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Available Dates
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="date"
              className="border rounded px-3 py-2 w-full"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-yellow-500 text-white px-3 rounded"
              onClick={handleAddDate}
            >
              + Add Date
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableDates.map((d, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm px-2 py-1 rounded flex items-center gap-1"
              >
                {d}
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => handleRemoveDate(d)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* ✅ Available Time Slots */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Available Time Slots
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="time"
              className="border rounded px-3 py-2 w-full"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-yellow-500 text-white px-3 rounded"
              onClick={handleAddTime}
            >
              + Add Time
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTimeSlots.map((t, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm px-2 py-1 rounded flex items-center gap-1"
              >
                {t}
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => handleRemoveTime(t)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-700"
        >
          Add Experience
        </button>
      </form>
    </div>
  );
}
