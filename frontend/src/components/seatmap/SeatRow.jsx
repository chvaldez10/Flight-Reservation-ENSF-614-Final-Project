import React from "react";
import { Grid, Box } from "@mui/material";
import Seat from "./Seat";

const SeatRow = ({ rowNum, onSelect, selectedSeat }) => {
  const columns = ["A", "B", "C", "D"];

  const getSeatClass = (rowNum) => {
    if (rowNum === 1) return "business";
    if (rowNum >= 2 && rowNum <= 3) return "comfort";
    return "economy";
  };

  const rowStyle = {
    marginTop: rowNum <= 2 ? "2rem" : rowNum <= 5 ? "1.5rem" : "1rem",
  };

  const isAisle = (index) => index === Math.floor(columns.length / 2);

  const isSeatAvailable = (seatNumber) => {
    return seatNumber === "A6" || seatNumber === "C7";
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
            isAvailable={isSeatAvailable(`${columnLabel}${rowNum}`)}
          />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default SeatRow;
