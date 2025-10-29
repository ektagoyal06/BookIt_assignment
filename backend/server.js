const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const Experience = require("./models/Experience");
const Booking = require("./models/Booking");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS — allow your Vercel frontend
const allowedOrigins = [
  "https://book-it-assignment-topaz.vercel.app", // your Vercel frontend URL
  "http://localhost:5173", // for local testing
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ==============================
   🔹 POST Add New Experience
================================= */
app.post("/api/experiences", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const savedExp = await newExperience.save();
    res.status(201).json({
      message: "Experience added successfully!",
      experience: savedExp,
    });
  } catch (error) {
    console.error("❌ Error adding experience:", error);
    res.status(500).json({ error: "Failed to add experience" });
  }
});

/* ==============================
   🔹 GET All Experiences (with optional search)
================================= */
app.get("/api/experiences", async (req, res) => {
  try {
    const { q } = req.query;
    const query = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const experiences = await Experience.find(query);
    res.status(200).json(experiences);
  } catch (error) {
    console.error("❌ Error fetching experiences:", error);
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

/* ==============================
   🔹 GET Single Experience by ID
================================= */
app.get("/api/experiences/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(exp);
  } catch (error) {
    console.error("❌ Error fetching experience:", error);
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

/* ==============================
   🔹 POST Store Booking Data
================================= */
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({
      message: "Booking stored successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

/* ==============================
   ✅ Root Route
================================= */
app.get("/", (req, res) => {
  res.send("✅ BookIt Backend running successfully!");
});

/* ==============================
   ✅ Server Listen
================================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
