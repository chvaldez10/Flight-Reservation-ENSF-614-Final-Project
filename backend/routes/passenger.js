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

  export default router;