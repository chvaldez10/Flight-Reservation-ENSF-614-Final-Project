import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [newAircraftModel, setNewAircraftModel] = useState("");
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureDate: "",
    aircraftId: "",
  });
  const [editFlight, setEditFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetAircrafts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/aircraft");
      setAircrafts(response.data);
    } catch (error) {
      console.error("Error fetching aircrafts:", error);
    }
  };

  const handleDeleteAircraft = async (aircraftId) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3001/api/aircraft/${aircraftId}`);
      await handleGetAircrafts(); // Refresh the aircraft list after deleting one
    } catch (error) {
      console.error(`Error deleting aircraft with ID ${aircraftId}:`, error);
      setError("Error deleting aircraft: aircraft in use");
    } finally {
      setIsLoading(false);
    }
  };

  const closeError = () => {
    setError(null);
  };

  const handleAddAircraft = async () => {
    try {
      if (!newAircraftModel) {
        console.error("Model parameter is required");
        return;
      }

      setIsLoading(true);
      await axios.post("http://localhost:3001/api/aircraft", {
        model: newAircraftModel,
      });
      setNewAircraftModel(""); // Clear the input field
      await handleGetAircrafts(); // Refresh the aircraft list after adding a new one
    } catch (error) {
      console.error("Error adding aircraft:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFlight = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:3001/api/flights", {
        ...newFlight,
      });
      setNewFlight({
        flightNumber: "",
        origin: "",
        destination: "",
        departureDate: "",
        aircraftId: "",
      }); // Clear the input fields
      await handleGetFlights(); // Refresh the flight list after adding a new one
    } catch (error) {
      console.error("Error adding flight:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFlight = (flight) => {
    setEditFlight(flight);
  };

  const handleUpdateFlight = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:3001/api/flights/${editFlight.flight_number}`,
        {
          origin: editFlight.origin,
          destination: editFlight.destination,
          departureDate: editFlight.departure_date,
          aircraftId: editFlight.aircraft_id,
        }
      );
      setEditFlight(null);
      await handleGetFlights(); // Refresh the flight list after updating
    } catch (error) {
      console.error("Error updating flight:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFlight = async (flightNumber) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3001/api/flights/${flightNumber}`);
      await handleGetFlights(); // Refresh the flight list after deleting
    } catch (error) {
      console.error(
        `Error deleting flight with flight number ${flightNumber}:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetFlights = async () => {
    try {
      setIsLoading(true);
      console.log("Selected Date:", selectedDate);
      const response = await axios.get(
        `http://localhost:3001/api/flights/byDate?date=${selectedDate}`
      );
      console.log("Response from backend:", response.data);
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAircrafts();
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>

      <h3>Aircraft:</h3>
      <button className="get-button" onClick={handleGetAircrafts}>
        Get Aircraft
      </button>

      {error && (
        <div className="error-popup">
          <span className="close-btn" onClick={closeError}>
            &times;
          </span>
          {error}
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th className="th">ID</th>
            <th className="th">Model</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody>
          {aircrafts.map((aircraft) => (
            <tr key={aircraft.AircraftID}>
              <td className="td">{aircraft.AircraftID}</td>
              <td className="td">{aircraft.Model}</td>
              <td className="td">
                <button
                  onClick={() => handleDeleteAircraft(aircraft.AircraftID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <label>
        Add Aircraft:
        <input
          type="text"
          value={newAircraftModel}
          onChange={(e) => setNewAircraftModel(e.target.value)}
        />
      </label>
      <button onClick={handleAddAircraft}>Add Aircraft</button>

      <h3>Flights:</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetFlights();
        }}
      >
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
        <button type="submit">Get Flights</button>
      </form>

      {isLoading && <p>Loading flights...</p>}

      <ul>
        {flights.map((flight) => (
          <li key={flight.flight_number}>
            {flight.origin} to {flight.destination}{" "}
            <button onClick={() => handleEditFlight(flight)}>Edit</button>{" "}
            <button onClick={() => handleDeleteFlight(flight.flight_number)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Edit Flight Section */}
      {editFlight && (
        <div>
          <h4>Edit Flight</h4>
          <label>
            Origin:
            <input
              type="text"
              value={editFlight.origin}
              onChange={(e) =>
                setEditFlight({ ...editFlight, origin: e.target.value })
              }
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              value={editFlight.destination}
              onChange={(e) =>
                setEditFlight({ ...editFlight, destination: e.target.value })
              }
            />
          </label>
          <label>
            Departure Date:
            <input
              type="date"
              value={editFlight.departure_date}
              onChange={(e) =>
                setEditFlight({ ...editFlight, departure_date: e.target.value })
              }
            />
          </label>
          <label>
            Aircraft ID:
            <input
              type="text"
              value={editFlight.aircraft_id}
              onChange={(e) =>
                setEditFlight({ ...editFlight, aircraft_id: e.target.value })
              }
            />
          </label>
          <button onClick={handleUpdateFlight}>Update Flight</button>
          <button onClick={() => setEditFlight(null)}>Cancel</button>
        </div>
      )}

      {/* Add Flight Section */}
      <div>
        <h4>Add Flight</h4>
        <label>
          Flight Number:
          <input
            type="text"
            value={newFlight.flightNumber}
            onChange={(e) =>
              setNewFlight({ ...newFlight, flightNumber: e.target.value })
            }
          />
        </label>
        <label>
          Origin:
          <input
            type="text"
            value={newFlight.origin}
            onChange={(e) =>
              setNewFlight({ ...newFlight, origin: e.target.value })
            }
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={newFlight.destination}
            onChange={(e) =>
              setNewFlight({ ...newFlight, destination: e.target.value })
            }
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={newFlight.departureDate}
            onChange={(e) =>
              setNewFlight({ ...newFlight, departureDate: e.target.value })
            }
          />
        </label>
        <label>
          Aircraft ID:
          <input
            type="text"
            value={newFlight.aircraftId}
            onChange={(e) =>
              setNewFlight({ ...newFlight, aircraftId: e.target.value })
            }
          />
        </label>
        <button onClick={handleAddFlight}>Add Flight</button>
      </div>
    </div>
  );
};

export default Admin;
