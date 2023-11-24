import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all crew members
router.get("/crew", async (req, res) => {
  try {
    const crew = await db.query("SELECT * FROM Crew");
    res.json(crew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for adding a new crew member
router.post("/crew", async (req, res) => {
  try {
    const { CrewID, LName, FName, Position } = req.body;

    if (!CrewID || !LName || !FName || !Position) {
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    const result = await db.query(
      "INSERT INTO Crew (CrewID, LName, FName, Position) VALUES (?, ?, ?, ?)",
      [CrewID, LName, FName, Position]
    );

    const newCrewMember = {
      CrewID,
      LName,
      FName,
      Position,
    };

    res.status(201).json(newCrewMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for deleting a crew member by ID
router.delete("/crew/:id", async (req, res) => {
  try {
    const crewID = req.params.id;

    if (!crewID) {
      return res.status(400).json({ error: "Crew ID parameter is required" });
    }

    const result = await db.query("DELETE FROM Crew WHERE CrewID = ?", [
      crewID,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Crew member not found" });
    }

    res.status(200).json({ message: "Crew member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for editing a crew member by ID
router.put("/crew/:id", async (req, res) => {
  try {
    const crewID = req.params.id;
    const { LName, FName, Position } = req.body;

    if (!crewID || (!LName && !FName && !Position)) {
      return res.status(400).json({
        error: "Crew ID and at least one field to update are required",
      });
    }

    // Construct the SET part of the SQL query dynamically based on provided fields
    const updateFields = [];
    if (LName) updateFields.push(`LName = '${LName}'`);
    if (FName) updateFields.push(`FName = '${FName}'`);
    if (Position) updateFields.push(`Position = '${Position}'`);

    const updateQuery = `UPDATE Crew SET ${updateFields.join(
      ", "
    )} WHERE CrewID = ?`;

    const result = await db.query(updateQuery, [crewID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Crew member not found" });
    }

    res.status(200).json({ message: "Crew member updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to list crew members of a specific FlightID
router.get("/crew/:flightID", async (req, res) => {
  try {
    const flightID = req.params.flightID;

    if (!flightID) {
      return res.status(400).json({ error: "Flight ID parameter is required" });
    }

    // Query the database to get crew members for the specified FlightID
    const query = `
        SELECT c.*
        FROM Crew c
        JOIN FlightCrew fc ON c.CrewID = fc.CrewID
        WHERE fc.FlightID = ?;
      `;

    const crew = await db.query(query, [flightID]);

    res.json(crew);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get all crew details from FlightCrew
router.get("/crew/details", async (req, res) => {
  try {
    const query = `
          SELECT c.*, fc.FlightID, f.Destination
          FROM Crew c
          LEFT JOIN FlightCrew fc ON c.CrewID = fc.CrewID
          LEFT JOIN Flights f ON fc.FlightID = f.FlightID;
        `;

    console.log("Executing query:", query);

    const crewDetails = await db.query(query);

    console.log("Query result:", crewDetails);

    res.json(crewDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
