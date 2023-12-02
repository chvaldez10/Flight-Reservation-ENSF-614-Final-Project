import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/NavbarComponent";
import { useBookingDetails } from "../../context/BookingDetailsContext";

const SimpleFlight = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const { updateBookingDetail } = useBookingDetails();
  const { city } = useParams();
  const navigate = useNavigate();

  // Helper function to format time
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
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
  }, [city]);

  const destinationCities = [
    ...new Set(flights.map((flight) => flight.Destination)),
  ];

  const sortedDestinationCities = destinationCities.sort();

  useEffect(() => {
    const filtered = flights.filter((flight) => {
      return (
        selectedDestination === "" || flight.Destination === selectedDestination
      );
    });

    setFilteredFlights(filtered);
  }, [flights, selectedDestination]);

  const handleBookFlight = (flightID) => {
    // navigate to seatmap
    navigate("/seatmap");

    // update booking details
    updateBookingDetail("FlightID", flightID);
  };

  return (
    <div>
      <Navbar />
      <h2 className="title">Flights</h2>

      {/* Label and Dropdown to select destination */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <label
          style={{ marginLeft: "15px", marginRight: "15px", marginTop: "10px" }}
        >
          Select Destination:
        </label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
        >
          <option value="">All Destinations</option>
          {sortedDestinationCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

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
            <th className="th"></th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights.map((flight) => (
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
