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
    res.status(200).json({ message: "Passenger added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

  // Endpoint for deleting a passenger by BookingID and Email
router.delete("/passenger/:bookingID/:email", async (req, res) => {
  try {
    const bookingID = req.params.bookingID;
    const email = req.params.email;

    if (!bookingID || !email) {
      return res.status(400).json({ error: "Booking ID and Email parameters are required" });
    }

    // Check if the passenger exists in the Passengers table
    const checkQuery = "SELECT * FROM Passengers WHERE BookingID = ? AND Email = ?";
    const checkResult = await db.query(checkQuery, [bookingID, email]);

    if (checkResult.length === 0) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    // Delete the passenger record
    const deleteQuery = "DELETE FROM Passengers WHERE BookingID = ? AND Email = ?";
    await db.query(deleteQuery, [bookingID, email]);

    res.json({ message: "Passenger deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  export default router;
