import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/NavbarComponent";

const SimpleFlight = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("/api/flights");
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>All Flights</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.FlightID}>
            <strong>{flight.FlightID}</strong> - {flight.Origin} to{" "}
            {flight.Destination}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleFlight;
