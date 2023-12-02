import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Navbar from "../../components/navbar/NavbarComponent.jsx";

const Staff = () => {
  const [passengers, setPassengers] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleGetPassengers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/passenger/${selectedFlight}`
      );
      setPassengers(response.data);

      if (response.data.length === 0) {
        setSnackbarMessage("No passengers on this flight");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error fetching passengers:", error);
      setError("Error fetching passengers");
      setSnackbarOpen(true);
    } finally {
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="title">Airline User - Passenger List</h2>
      {/* Select Flight */}
      <label className="label">
        Select Flight:
        <select
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
          className="input"
        >
          <option value="" disabled>
            Select a flight
          </option>
          {flights.map((flight) => (
            <option key={flight.FlightID} value={flight.FlightID}>
              {flight.FlightID}
            </option>
          ))}
        </select>
      </label>

      <button className="button" onClick={handleGetPassengers}>
        Get Passengers
      </button>
      {/* Passengers Table */}
      <table className="table">
        <thead>
          <tr>
            <th className="th">First Name</th>
            <th className="th">Last Name</th>
            <th className="th">Seat</th>
            <th className="th">Email</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index}>
              <td className="td">{passenger.FName}</td>
              <td className="td">{passenger.LName}</td>
              <td className="td">{`${passenger.SeatLetter}${passenger.SeatNum}`}</td>
              <td className="td">{passenger.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Staff;
