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

// Endpoint for deleting a passenger by BookingID and Email
router.delete("/passenger/:bookingID/:email", async (req, res) => {
  try {
    const bookingID = req.params.bookingID;
    const email = req.params.email;

    if (!bookingID || !email) {
      return res
        .status(400)
        .json({ error: "Booking ID and Email parameters are required" });
    }

    // Get the seat information for the passenger
    const seatQuery =
      "SELECT SeatLetter, SeatNum, FlightID FROM Passengers WHERE BookingID = ? AND Email = ?";
    const seatResult = await db.query(seatQuery, [bookingID, email]);

    if (seatResult.length === 0) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    const { SeatLetter, SeatNum, FlightID } = seatResult[0];

    // Delete the passenger record from the Passengers table
    const deleteQuery =
      "DELETE FROM Passengers WHERE BookingID = ? AND Email = ?";
    await db.query(deleteQuery, [bookingID, email]);

    // Update the seat availability in the SeatMap table
    const updateSeatQuery =
      "UPDATE SeatMap SET Availability = TRUE WHERE SeatLetter = ? AND SeatNum = ? AND FlightID = ?";
    await db.query(updateSeatQuery, [SeatLetter, SeatNum, FlightID]);

    res.json({ message: "Passenger deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
