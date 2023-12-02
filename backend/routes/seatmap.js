import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint to get Seatmap based on flightID
router.get("/seatAvailability/:flightID", async(req, res) => {
    try {
        const flightID = req.params.flightID;
  
        if (!flightID) {
          return res.status(400).json({ error: "Flight ID parameter is required" });
        }

        const query = "SELECT SeatLetter, SeatNum, Availability FROM SeatMap WHERE FlightID = ?";
        const result = await db.query(query, [flightID]);

        const seatMap = result.reduce((acc, { SeatLetter, SeatNum, Availability }) => {
            acc[`${SeatLetter}${SeatNum}`] = Availability;
            return acc;
        }, {});
        res.json(seatMap);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

