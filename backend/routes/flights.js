import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for fetching all flights
router.get("/flights", async (req, res) => {
  try {
    const flights = await db.query("SELECT * FROM Flights");
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for fetching flights by date
router.get("/flights/byDate", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const flights = await db.query(
      "SELECT * FROM Flights WHERE DATE(DepartureDate) = ?",
      [date]
    );

    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for fetching flights by city
router.get("/flights/:city", async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    const flights = await db.query(
      "SELECT * FROM Flights WHERE Destination = ?",
      [city]
    );

    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for adding a new flight
router.post("/flights", async (req, res) => {
  try {
    const { flightNumber, origin, destination, departureDate, aircraftId } =
      req.body;

    // Validate request body
    if (
      !flightNumber ||
      !origin ||
      !destination ||
      !departureDate ||
      !aircraftId
    ) {
      return res.status(400).json({
        error:
          "flightNumber, origin, destination, departureDate, and aircraftId are required",
      });
    }

    // Insert new flight into the database
    const result = await db.query(
      "INSERT INTO Flights (FlightID, Origin, Destination, DepartureDate, AircraftID) VALUES (?, ?, ?, ?, ?)",
      [flightNumber, origin, destination, departureDate, aircraftId]
    );

    res.json({
      message: "Flight added successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for deleting a flight
router.delete("/flights/:flightNumber", async (req, res) => {
  try {
    const { flightNumber } = req.params;

    // Delete the flight from the database
    const result = await db.query(
      "DELETE FROM Flights WHERE FlightID = ?",
      [flightNumber]
    );

    res.json({
      message: "Flight deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for updating a flight
router.put("/flights/:flightNumber", async (req, res) => {
  try {
    const { flightNumber } = req.params;
    const { origin, destination, departureDate, aircraftId } = req.body;

    // Validate request body
    if (!origin || !destination || !departureDate || !aircraftId) {
      return res
        .status(400)
        .json({
          error:
            "origin, destination, departureDate, and aircraftId are required",
        });
    }

    // Update the flight in the database
    const result = await db.query(
      "UPDATE Flights SET Origin = ?, Destination = ?, DepartureDate = ?, AircraftID = ? WHERE FlightID = ?",
      [origin, destination, departureDate, aircraftId, flightNumber]
    );

    res.json({
      message: "Flight updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
