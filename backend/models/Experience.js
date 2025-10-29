
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  price: Number,
  image: String,
  availableDates: [String],
  availableTimeSlots: [String],
});

module.exports = mongoose.model("Experience", experienceSchema);
