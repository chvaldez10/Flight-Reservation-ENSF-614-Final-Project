import express from "express";
import db from "../config/db.js";

const router = express.Router();

// endpoint for booking
router.post("/completeBooking", async (req, res) => {
  try {
    const {
      FlightID,
      SeatLetter,
      SeatNum,
      InsuranceFlag,
      LName,
      FName,
      Email,
    } = req.body;

    // Validate the booking input
    if (!FlightID || !SeatLetter || !SeatNum || InsuranceFlag === undefined) {
      return res
        .status(400)
        .json({ error: "Required booking parameters are missing" });
    }

    // Validate the passenger input
    if (!LName || !FName || !Email) {
      return res.status(400).json({ error: "Passenger details are missing" });
    }

    // Insert the booking and retrieve the inserted ID
    const bookingQuery =
      "INSERT INTO Booking (FlightID, SeatLetter, SeatNum, InsuranceFlag) VALUES (?, ?, ?, ?)";
    const bookingResult = await db.query(bookingQuery, [
      FlightID,
      SeatLetter,
      SeatNum,
      InsuranceFlag,
    ]);

    if (!bookingResult.affectedRows || !bookingResult.insertId) {
      return res.status(500).json({ error: "Failed to record booking" });
    }

    const bookingID = bookingResult.insertId;

    // Insert the passenger with the BookingID
    const passengerQuery =
      "INSERT INTO Passengers (BookingID, LName, FName, SeatLetter, SeatNum, FlightID, Email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await db.query(passengerQuery, [
      bookingID,
      LName,
      FName,
      SeatLetter,
      SeatNum,
      FlightID,
      Email,
    ]);

    res.status(201).json({
      message: "Booking and passenger recorded",
      BookingID: bookingID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const { BookingID, Amount, UserID } = req.body;
    if (!BookingID || !Amount || !UserID) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }
    const Time_stamp = new Date().toISOString().slice(0, 19).replace("T", " ");
    const query =
      "INSERT INTO PaymentTransaction (BookingID, Amount, Time_stamp, UserID) VALUES (?, ?, ?, ?)";
    await db.query(query, [BookingID, Amount, Time_stamp, UserID]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
