import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Seat from "./Seat";
import axios from "axios";
import { useBookingDetails } from "../../context/BookingDetailsContext";

const SeatRow = ({ rowNum, onSelect, selectedSeat }) => {
  const { bookingDetails, updateBookingDetails, submitBookingDetails } =
    useBookingDetails();
  const [flightID, setFlightID] = useState(bookingDetails.FlightID);
  const [seatInfo, setSeatInfo] = useState({});

  console.log(`flight id ${flightID}`);

  const columns = ["A", "B", "C", "D"];

  const getSeatClass = (rowNum) => {
    if (rowNum === 1) return "business";
    if (rowNum >= 2 && rowNum <= 3) return "comfort";
    return "economy";
  };

  const rowStyle = {
    marginTop: rowNum <= 2 ? "2rem" : rowNum <= 5 ? "1.5rem" : "1rem",
  };

  // fetch seatmap
  useEffect(() => {
    const fetchSeatInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/seatAvailability/${flightID}`
        );
        console.log(response.data);
        setSeatInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch seat info:", error);
      }
    };

    if (flightID) {
      fetchSeatInfo();
    }
  }, [flightID]);

  const isAisle = (index) => index === Math.floor(columns.length / 2);

  const checkAvailability = (seatNumber) => {
    return !seatInfo.hasOwnProperty(seatNumber);
  };

  return (
    <Grid container item xs={12} justifyContent="center" style={rowStyle}>
      {columns.map((columnLabel, index) => (
        <React.Fragment key={`${columnLabel}${rowNum}`}>
          {isAisle(index) && <Box width={40} />}
          <Seat
            seatNumber={`${columnLabel}${rowNum}`}
            seatClass={getSeatClass(rowNum)}
            onSelect={onSelect}
            isSelected={selectedSeat === `${columnLabel}${rowNum}`}
            isAvailable={checkAvailability(`${columnLabel}${rowNum}`)}
          />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default SeatRow;
