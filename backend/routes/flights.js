import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all flights
router.get("/flights", async (req, res) => {
    try {
        const flights = await db.query("SELECT * FROM flights");
        res.json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export default router;