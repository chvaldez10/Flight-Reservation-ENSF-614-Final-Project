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
      await handleGetAllFlights(); // Refresh the flight list after adding a new one
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
        `http://localhost:3001/api/flights/${editFlight.FlightID}`,
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

  const handleDeleteFlight = async (FlightID) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3001/api/flights/${FlightID}`);
      await handleGetAllFlights(); // Refresh the flight list after deleting
    } catch (error) {
      console.error(
        `Error deleting flight with flight number ${FlightID}:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAllFlights = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3001/api/flights");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching all flights:", error);
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
      <h2 className="title">Mile High: Admin Page</h2>

      <h3 className="sub-title">Aircraft List:</h3>
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
                  className="delete-button"
                  onClick={() => handleDeleteAircraft(aircraft.AircraftID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <label className="label">
        Add Aircraft:
        <input
          type="text"
          value={newAircraftModel}
          onChange={(e) => setNewAircraftModel(e.target.value)}
          className="input"
        />
      </label>
      <button className="button" onClick={handleAddAircraft}>
        Add Aircraft
      </button>

      {/* Get Flights */}
      <h3 className="sub-title">Flights List:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetAllFlights();
        }}
      >
        <label className="label">
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input"
          />
        </label>
        <button className="button" type="submit">
          Get Flights
        </button>
        <button className="button" onClick={() => handleGetAllFlights()}>
          Get All Flights
        </button>
      </form>

      {isLoading && <p>Loading flights...</p>}

      <table className="table">
        <thead>
          <tr>
            <th className="th">Flight ID</th>
            <th className="th">Origin</th>
            <th className="th">Destination</th>
            <th className="th">Departure Date</th>
            <th className="th">Aircraft ID</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.FlightID}>
              <td className="td">{flight.FlightID}</td>
              <td className="td">{flight.Origin}</td>
              <td className="td">{flight.Destination}</td>
              <td className="td">{new Date(flight.DepartureDate).toLocaleDateString()}</td>
              <td className="td">{flight.AircraftID}</td>
              <td className="td">
                <button
                  className="button"
                  onClick={() => handleEditFlight(flight)}
                >
                  Edit
                </button>{" "}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteFlight(flight.FlightID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Flight Section */}
      {editFlight && (
        <div>
          <h4>Edit Flight</h4>
          <label>
            Origin:
            <input
              type="text"
              value={editFlight.Origin}
              onChange={(e) =>
                setEditFlight({ ...editFlight, Origin: e.target.value })
              }
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              value={editFlight.Destination}
              onChange={(e) =>
                setEditFlight({ ...editFlight, Destination: e.target.value })
              }
            />
          </label>
          <label>
            Departure Date:
            <input
              type="date"
              value={editFlight.DepartureDate}
              onChange={(e) =>
                setEditFlight({ ...editFlight, DepartureDate: e.target.value })
              }
            />
          </label>
          <label>
            Aircraft ID:
            <input
              type="text"
              value={editFlight.AircraftID}
              onChange={(e) =>
                setEditFlight({ ...editFlight, AircraftID: e.target.value })
              }
            />
          </label>
          <button className="button" onClick={handleUpdateFlight}>
            Update Flight
          </button>
          <button className="button" onClick={() => setEditFlight(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* Add Flight Section */}
      <div>
        <h4>Add Flight</h4>
        <label className="label">
          Flight Number:
          <input
            type="text"
            value={newFlight.flightNumber}
            onChange={(e) =>
              setNewFlight({ ...newFlight, flightNumber: e.target.value })
            }
            className="input"
          />
        </label>
        <label className="label">
          Origin:
          <input
            type="text"
            value={newFlight.origin}
            onChange={(e) =>
              setNewFlight({ ...newFlight, origin: e.target.value })
            }
            className="input"
          />
        </label>
        <label className="label">
          Destination:
          <input
            type="text"
            value={newFlight.destination}
            onChange={(e) =>
              setNewFlight({ ...newFlight, destination: e.target.value })
            }
            className="input"
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
        <button className="button" onClick={handleAddFlight}>
          Add Flight
        </button>
      </div>
    </div>
  );
};

export default Admin;
