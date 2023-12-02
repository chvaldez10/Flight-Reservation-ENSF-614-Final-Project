import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/recordBooking", async (req, res) => {
  try {
    const { UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag } = req.body;

    // Validate the input
    if (
      !UserID ||
      !FlightID ||
      !SeatLetter ||
      !SeatNum ||
      InsuranceFlag === undefined
    ) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    // Insert the booking and retrieve the inserted ID
    const query =
      "INSERT INTO Booking (UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag) VALUES (?, ?, ?, ?, ?)";

    const result = await db.query(query, [
      UserID,
      FlightID,
      SeatLetter,
      SeatNum,
      InsuranceFlag,
    ]);

    // Check if insertion was successful and send the BookingID back to the client
    if (result.affectedRows && result.insertId) {
      res
        .status(201)
        .json({ message: "Booking recorded", BookingID: result.insertId });
    } else {
      res.status(500).json({ error: "Failed to record booking" });
    }
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
