const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
