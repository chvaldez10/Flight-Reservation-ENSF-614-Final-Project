import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all flights
router.get("/flights", async (req, res) => {
  try {
    const flights = await db.query("SELECT * FROM flights");
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for fetching flights by date
router.get("/flights/byDate", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const flights = await db.query(
      "SELECT * FROM flights WHERE DATE(departure_date) = ?",
      [date]
    );

    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
