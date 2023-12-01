import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/NavbarComponent";

const SimpleFlight = () => {
  const [flights, setFlights] = useState([]);

    // Helper function to format time
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
      }

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

  const handleBookFlight = (flightID) => {
    // Placeholder for booking logic
    console.log(`Booking flight ${flightID}`);
  };

  return (
    <div>
      <Navbar />
      <h2 className="title">Flights</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Flight ID</th>
            <th className="th">Origin</th>
            <th className="th">Destination</th>
            <th className="th">Departure Date</th>
            <th className="th">Departure Time</th>
            <th className="th">Arrival Time</th>
            <th className="th">Flight Duration (Hrs)</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.FlightID}>
              <td className="td">{flight.FlightID}</td>
              <td className="td">{flight.Origin}</td>
              <td className="td">{flight.Destination}</td>
              <td className="td">
                {new Date(flight.DepartureDate).toLocaleDateString()}
              </td>
              <td className="td">{formatTime(flight.DepartureTime)}</td>
              <td className="td">{formatTime(flight.ArrivalTime)}</td>
              <td className="td">{formatTime(flight.Duration)}</td>

              <td className="td">
                <button
                  className="button"
                  onClick={() => handleBookFlight(flight.FlightID)}
                >
                  Book Flight
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleFlight;
