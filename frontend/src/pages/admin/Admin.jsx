import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [flights, setFlights] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
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
  const [crewMembers, setCrewMembers] = useState([]);
  const [newCrew, setNewCrew] = useState({
    CrewID: "",
    LName: "",
    FName: "",
    Position: "",
  });
  const [selectedFlightID, setSelectedFlightID] = useState("");
  const [crewForSelectedFlight, setCrewForSelectedFlight] = useState([]);
  const [showAllCrew, setShowAllCrew] = useState(true);

  const handleGetAircraft = async () => {
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
      await handleGetAircraft(); // Refresh the aircraft list after deleting one
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
      await handleGetAircraft(); // Refresh the aircraft list after adding a new one
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
      const departureDate = editFlight.DepartureDate
        ? editFlight.DepartureDate.split("T")[0]
        : null;
      await axios.put(
        `http://localhost:3001/api/flights/${editFlight.FlightID}`,
        {
          origin: editFlight.Origin,
          destination: editFlight.Destination,
          departureDate: departureDate,
          aircraftId: editFlight.AircraftID,
        }
      );
      setEditFlight(null);
      await handleGetAllFlights(); // Refresh the flight list after updating
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
      setAllFlights(response.data); // Update all flights
      setSelectedDate("");
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

  const handleGetCrew = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/crew-details"
      );
      setCrewMembers(response.data);
    } catch (error) {
      console.error("Error fetching crew members:", error);
    }
  };

  const handleAddCrew = async () => {
    try {
      if (
        !newCrew.CrewID ||
        !newCrew.LName ||
        !newCrew.FName ||
        !newCrew.Position
      ) {
        console.error("Required parameters are missing");
        return;
      }

      setIsLoading(true);
      await axios.post("http://localhost:3001/api/crew", {
        CrewID: newCrew.CrewID,
        LName: newCrew.LName,
        FName: newCrew.FName,
        Position: newCrew.Position,
      });

      setNewCrew({
        CrewID: "",
        LName: "",
        FName: "",
        Position: "",
      }); // Clear the input fields

      await handleGetCrew(); // Refresh the crew list after adding a new one
    } catch (error) {
      console.error("Error adding crew member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCrew = async (crewID) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3001/api/crew/${crewID}`);
      await handleGetCrew(); // Refresh the crew list after deleting one
    } catch (error) {
      console.error(`Error deleting crew member with ID ${crewID}:`, error);
      setError("Error deleting crew member: crew member assigned to a flight");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCrewForFlight = async (flightID) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/crew/${flightID}`
      );
      setCrewForSelectedFlight(response.data);
    } catch (error) {
      console.error("Error fetching crew members for flight:", error);
    }
  };

  useEffect(() => {
    if (selectedFlightID) {
      handleGetCrewForFlight(selectedFlightID);
    }
  }, [selectedFlightID]);

  useEffect(() => {
    handleGetAircraft();
    handleGetCrew();
    if (selectedDate) {
      handleGetFlights();
    } else {
      handleGetAllFlights();
    }
  }, [selectedDate]);

  return (
    <div>
      <h2 className="title">Mile High: Admin Page</h2>

      <h3 className="sub-title">Aircraft List:</h3>

      <table className="table">
        <thead>
          <tr>
            <th className="th">Aircraft ID</th>
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

      {error && (
        <div className="error-popup">
          <span onClick={closeError} className="close-btn">
            &times;
          </span>
          {error}
        </div>
      )}

      <h4>Add Aircraft</h4>
      <label className="label">
        Aircraft Model:
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
          handleGetFlights();
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
          Get Flights by Date
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
          {selectedDate
            ? flights.map((flight) => (
                <tr key={flight.FlightID}>
                  <td className="td">{flight.FlightID}</td>
                  <td className="td">{flight.Origin}</td>
                  <td className="td">{flight.Destination}</td>
                  <td className="td">
                    {new Date(flight.DepartureDate).toLocaleDateString()}
                  </td>
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
              ))
            : allFlights.map((flight) => (
                <tr key={flight.FlightID}>
                  <td className="td">{flight.FlightID}</td>
                  <td className="td">{flight.Origin}</td>
                  <td className="td">{flight.Destination}</td>
                  <td className="td">
                    {new Date(flight.DepartureDate).toLocaleDateString()}
                  </td>
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
          <label className="label">
            Origin:
            <input
              type="text"
              value={editFlight.Origin}
              onChange={(e) =>
                setEditFlight({ ...editFlight, Origin: e.target.value })
              }
              className="input"
            />
          </label>
          <label className="label">
            Destination:
            <input
              type="text"
              value={editFlight.Destination}
              onChange={(e) =>
                setEditFlight({ ...editFlight, Destination: e.target.value })
              }
              className="input"
            />
          </label>
          <label className="label">
            Departure Date:
            <input
              type="date"
              value={
                editFlight.DepartureDate
                  ? editFlight.DepartureDate.split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditFlight({
                  ...editFlight,
                  DepartureDate: e.target.value + "T00:00:00.000Z",
                })
              }
              className="input"
            />
          </label>
          <label className="label">
            Aircraft ID:
            <input
              type="text"
              value={editFlight.AircraftID}
              onChange={(e) =>
                setEditFlight({ ...editFlight, AircraftID: e.target.value })
              }
              className="input"
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
          Flight ID:
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
        <label className="label">
          Departure Date:
          <input
            type="date"
            value={newFlight.departureDate}
            onChange={(e) =>
              setNewFlight({ ...newFlight, departureDate: e.target.value })
            }
            className="input"
          />
        </label>
        <label className="label">
          Aircraft ID:
          <input
            type="text"
            value={newFlight.aircraftId}
            onChange={(e) =>
              setNewFlight({ ...newFlight, aircraftId: e.target.value })
            }
            className="input"
          />
        </label>
        <button className="button" onClick={handleAddFlight}>
          Add Flight
        </button>
      </div>

      {/* Crew List Section */}
      <div>
        <h3 className="sub-title">Crew List:</h3>

        {/* Dropdown for selecting Flight ID */}
        <label className="label">
          Show Crew by Flight ID:
          <select
            value={selectedFlightID}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setShowAllCrew(selectedValue === ""); // Set showAllCrew based on the selected value
              setSelectedFlightID(selectedValue);
            }}
            className="input"
          >
            <option value="">Show All Crew</option>
            {allFlights.map((flight) => (
              <option key={flight.FlightID} value={flight.FlightID}>
                {flight.FlightID}
              </option>
            ))}
          </select>
        </label>

        {/* Crew members table */}
        {showAllCrew ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th className="th">Flight ID</th>
                  <th className="th">Crew ID</th>
                  <th className="th">First Name</th>
                  <th className="th">Last Name</th>
                  <th className="th">Position</th>
                  <th className="th">Destination</th>
                  <th className="th">Action</th>
                </tr>
              </thead>
              <tbody>
                {crewMembers.map((crew) => (
                  <tr key={crew.CrewID}>
                    <td className="td">{crew.FlightID || "N/A"}</td>
                    <td className="td">{crew.CrewID}</td>
                    <td className="td">{crew.FName}</td>
                    <td className="td">{crew.LName}</td>
                    <td className="td">{crew.Position}</td>
                    <td className="td">{crew.Destination || "N/A"}</td>
                    <td className="td">
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteCrew(crew.CrewID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            {selectedFlightID && (
              <table className="table">
                <thead>
                  <tr>
                    <th className="th">Flight ID</th>
                    <th className="th">Crew ID</th>
                    <th className="th">First Name</th>
                    <th className="th">Last Name</th>
                    <th className="th">Position</th>
                    <th className="th">Destination</th>
                    <th className="th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {crewForSelectedFlight.map((crew) => (
                    <tr key={crew.CrewID}>
                      <td className="td">{crew.FlightID || "N/A"}</td>
                      <td className="td">{crew.CrewID}</td>
                      <td className="td">{crew.FName}</td>
                      <td className="td">{crew.LName}</td>
                      <td className="td">{crew.Position}</td>
                      <td className="td">{crew.Destination || "N/A"}</td>
                      <td className="td">
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteCrew(crew.CrewID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Add Crew Section */}
      <div>
        <h4>Add Crew Member</h4>
        <label className="label">
          Crew ID:
          <input
            type="text"
            value={newCrew.CrewID}
            onChange={(e) => setNewCrew({ ...newCrew, CrewID: e.target.value })}
            className="input"
          />
        </label>
        <label className="label">
          First Name:
          <input
            type="text"
            value={newCrew.FName}
            onChange={(e) => setNewCrew({ ...newCrew, FName: e.target.value })}
            className="input"
          />
        </label>
        <label className="label">
          Last Name:
          <input
            type="text"
            value={newCrew.LName}
            onChange={(e) => setNewCrew({ ...newCrew, LName: e.target.value })}
            className="input"
          />
        </label>
        <label className="label">
          Position:
          <input
            type="text"
            value={newCrew.Position}
            onChange={(e) =>
              setNewCrew({ ...newCrew, Position: e.target.value })
            }
            className="input"
          />
        </label>
        <button className="button" onClick={handleAddCrew}>
          Add Crew Member
        </button>
      </div>
    </div>
  );
};

export default Admin;
