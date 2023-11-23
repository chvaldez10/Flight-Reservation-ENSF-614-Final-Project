import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all aircrafts
router.get("/aircraft", async (req, res) => {
  try {
    // Use the Singleton instance for database queries
    const aircrafts = await db.query("SELECT * FROM aircraft");
    res.json(aircrafts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for adding a new aircraft
router.post("/aircraft", async (req, res) => {
  try {
    const { model } = req.body;

    if (!model) {
      return res.status(400).json({ error: "Model parameter is required" });
    }

    const result = await db.query("INSERT INTO aircraft (model) VALUES (?)", [model]);
    const newAircraft = {
      aircraft_id: result.insertId,
      model: model,
    };

    res.status(201).json(newAircraft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for deleting an aircraft by ID
router.delete("/aircraft/:id", async (req, res) => {
  try {
    const aircraftId = req.params.id;

    if (!aircraftId) {
      return res.status(400).json({ error: "Aircraft ID parameter is required" });
    }

    const result = await db.query("DELETE FROM aircraft WHERE aircraft_id = ?", [aircraftId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Aircraft not found" });
    }

    res.status(200).json({ message: "Aircraft deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
