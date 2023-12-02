import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all passengers based on flightID
router.get("/passenger/:flightID", async (req, res) => {
  try {
    const flightID = req.params.flightID;

    if (!flightID) {
      return res.status(400).json({ error: "Flight ID parameter is required" });
    }
    const query = " SELECT * FROM Passengers WHERE FlightID = ?";
    const passenger = await db.query(query, [flightID]);
    res.json(passenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for writing to passenger table
router.post("/passenger", async (req, res) => {
  try {
    const { BookingID, LName, FName, SeatLetter, SeatNum, FlightID, Email } =
      req.body;

    if (
      !BookingID ||
      !LName ||
      !FName ||
      !SeatLetter ||
      !SeatNum ||
      !FlightID ||
      !Email
    ) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }
    const query =
      "INSERT INTO Passengers (BookingID, LName, FName, SeatLetter, SeatNum, FlightID, Email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.query(query, [
      BookingID,
      LName,
      FName,
      SeatLetter,
      SeatNum,
      FlightID,
      Email,
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateBookingID() {
  // Example: Generates a random number between 10000 and 99999
  return Math.floor(Math.random() * 90000) + 10000;
}

async function checkBookingIDExists(db, BookingID) {
  try {
    const query =
      "SELECT COUNT(*) AS count FROM Passengers WHERE BookingID = ?";
    const result = await db.query(query, [BookingID]);
    return result[0].count > 0;
  } catch (error) {
    console.error("Error checking BookingID:", error);
    throw error;
  }
}

export default router;
