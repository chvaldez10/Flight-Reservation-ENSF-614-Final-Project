import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all aircrafts
router.get("/aircraft", async (req, res) => {
  try {
    // Use the Singleton instance for database queries
    const aircrafts = await db.query("SELECT * FROM aircrafts");
    res.json(aircrafts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
