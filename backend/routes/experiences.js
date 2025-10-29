import express from "express";
import Experience from "../models/Experience.js";

const router = express.Router();

/* ==============================
   🔹 GET All Experiences (with Search)
================================= */
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    // ✅ Search in title or description (case-insensitive)
    const query = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const experiences = await Experience.find(query);
    res.status(200).json(experiences);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
});

/* ==============================
   🔹 GET Single Experience by ID
================================= */
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (err) {
    console.error("Error fetching experience by ID:", err);
    res.status(500).json({ message: "Failed to fetch experience" });
  }
});

/* ==============================
   🔹 POST Add New Experience
================================= */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      location,
      description,
      price,
      image,
      availableDates,
      availableTimeSlots,
    } = req.body;

    // ✅ Validate required fields
    if (!title || !location || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create new experience
    const newExperience = new Experience({
      title,
      location,
      description,
      price,
      image,
      availableDates: availableDates || [],
      availableTimeSlots: availableTimeSlots || [],
    });

    const savedExperience = await newExperience.save();
    res.status(201).json({
      message: "Experience added successfully!",
      experience: savedExperience,
    });
  } catch (error) {
    console.error("Error saving experience:", error);
    res.status(500).json({ message: "Failed to save experience" });
  }
});

export default router;
