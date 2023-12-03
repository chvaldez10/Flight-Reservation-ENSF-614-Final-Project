import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint to get Seatmap based on flightID
router.get("/seatAvailability/:flightID", async (req, res) => {
  try {
    const flightID = req.params.flightID;

    if (!flightID) {
      return res.status(400).json({ error: "Flight ID parameter is required" });
    }

    const query =
      "SELECT SeatLetter, SeatNum, Availability FROM SeatMap WHERE FlightID = ?";
    const result = await db.query(query, [flightID]);

    const seatMap = result.reduce(
      (acc, { SeatLetter, SeatNum, Availability }) => {
        acc[`${SeatLetter}${SeatNum}`] = Availability;
        return acc;
      },
      {}
    );
    res.json(seatMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update seatmap availability
router.post("/updateAvailability/:flightID", async (req, res) => {
  try {
    const FlightID = req.params.flightID;
    const { SeatLetter, SeatNum } = req.body;

    const updateQuery = `UPDATE SeatMap SET Availability = '0' WHERE FlightID = ? AND SeatLetter = ? AND SeatNum = ?;`;

    db.query(updateQuery, [FlightID, SeatLetter, SeatNum], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error executing SQL query" });
      }

      if (results.affectedRows > 0) {
        res.json({ message: "Seat availability updated successfully" });
      } else {
        res.status(404).json({ message: "Seat not found" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
