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
    const { UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag } = req.body;

    if (!UserID || !FlightID || !SeatLetter || !SeatNum) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    const insertQuery =
      "INSERT INTO Booking (UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag) VALUES (?, ?, ?, ?, ?)";
    const result = await db.query(insertQuery, [
      UserID,
      FlightID,
      SeatLetter,
      SeatNum,
      InsuranceFlag,
    ]);

    // Assuming result.insertId contains the auto-generated BookingID
    const newBookingID = result.insertId;

    res.status(200).json({
      message: "Booking created successfully",
      BookingID: newBookingID,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

export default router;
