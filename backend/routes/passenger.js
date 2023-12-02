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

<<<<<<< HEAD
    if (
      !BookingID ||
      !LName ||
      !FName ||
      !SeatLetter ||
      !SeatNum ||
      !FlightID ||
      !Email
    ) {
=======
    if (!BookingID || !LName || !FName || !SeatLetter || !SeatNum || !FlightID || !Email) {
>>>>>>> f835091d57f806e761a0b94e532d7b3db5ef7a17
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

export default router;
