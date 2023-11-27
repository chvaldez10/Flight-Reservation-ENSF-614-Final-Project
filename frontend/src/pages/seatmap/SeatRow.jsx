import React from "react";
import { Grid, Box } from "@mui/material";
import Seat from "./Seat"; // Import Seat component

const SeatRow = ({ rowNum, columns, onSelect }) => {
  const getSeatClass = (rowNum) => {
    if (rowNum >= 1 && rowNum <= 5) return "business";
    if (rowNum >= 6 && rowNum <= 10) return "comfort";
    return "economy";
  };

  // Function to check if an aisle should be added
  const isAisle = (index) => index === Math.floor(columns.length / 2);

  return (
    <Grid container item xs={12} justifyContent="center">
      {columns.map((columnLabel, index) => (
        <React.Fragment key={`${columnLabel}${rowNum}`}>
          {isAisle(index) && <Box width={20} />} {/* Aisle space */}
          <Seat
            seatNumber={`${columnLabel}${rowNum}`}
            seatClass={getSeatClass(rowNum)}
            onSelect={onSelect}
          />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default SeatRow;
