import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/recordBooking", async (req, res) => {
    try {
      const { UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag } = req.body;
      if (!UserID || !FlightID || !SeatLetter || !SeatNum || InsuranceFlag === undefined) {
          return res.status(400).json({ error: "Required parameters are missing" });
      }
      const query = "INSERT INTO Booking (UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag) VALUES (?, ?, ?, ?, ?)";
      await db.query(query, [UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag]);
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
    const Time_stamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = "INSERT INTO PaymentTransaction (BookingID, Amount, Time_stamp, UserID) VALUES (?, ?, ?, ?)";
    await db.query(query, [BookingID, Amount, Time_stamp, UserID ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;