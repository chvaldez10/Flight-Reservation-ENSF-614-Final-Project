import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/navbar/NavbarComponent.jsx";
import Footer from "../../components/footer/Footer.jsx";

const Staff = () => {
  const [passengers, setPassengers] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetPassengers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3001/api/passenger/${selectedFlight}`);
      setPassengers(response.data);
    } catch (error) {
      console.error('Error fetching passengers:', error);
      setError('Error fetching passengers');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <Navbar />
      <h2 className="title">Airline User - Passenger List</h2>
      {/* Select Flight */}
      <label className="label">
        Select Flight:
        <input
          type="text"
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
          className="input"
        />
      </label>
      <button className="button" onClick={handleGetPassengers}>
        Get Passengers
      </button>
      {isLoading && <p>Loading passengers...</p>}
      {error && <div className="error-message">{error}</div>}
      {/* Passengers Table */}
      <table className="table">
        <thead>
          <tr>
            <th className="th">Last Name</th>
            <th className="th">First Name</th>
            <th className="th">Seat</th>
            <th className="th">Email</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index}>
              <td className="td">{passenger.LName}</td>
              <td className="td">{passenger.FName}</td>
              <td className="td">{`${passenger.SeatLetter}${passenger.SeatNum}`}</td>
              <td className="td">{passenger.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Staff;
