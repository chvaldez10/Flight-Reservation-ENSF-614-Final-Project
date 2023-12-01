import React from "react";
import { Grid, Box } from "@mui/material";
import Seat from "./Seat";

/**
 * SeatRow component for displaying a row of seats.
 * It uses the Seat component to render each seat in the row.
 *
 * @component
 * @example
 * const rowNum = 1;
 * const onSelect = () => console.log("Seat selected");
 * const selectedSeat = "A1";
 * return (
 *   <SeatRow rowNum={rowNum} onSelect={onSelect} selectedSeat={selectedSeat} />
 * )
 *
 * @param {number} rowNum - The row number for this seat row.
 * @param {function} onSelect - Callback function to handle seat selection.
 * @param {string} selectedSeat - The currently selected seat identifier.
 */
const SeatRow = ({ rowNum, onSelect, selectedSeat }) => {
  // Seat columns identifiers
  const columns = ["A", "B", "C", "D"];

  /**
   * Determines the seat class based on the row number.
   * @param {number} rowNum - The row number.
   * @returns {string} - The class of the seat ('business', 'comfort', or 'economy').
   */
  const getSeatClass = (rowNum) => {
    if (rowNum === 1) return "business";
    if (rowNum >= 2 && rowNum <= 3) return "comfort";
    return "economy";
  };

  // Style for the seat row, varies based on the row number.
  const rowStyle = {
    marginTop: rowNum <= 2 ? "2rem" : rowNum <= 5 ? "1.5rem" : "1rem",
  };

  /**
   * Determines if the current position is an aisle.
   * @param {number} index - The index of the column.
   * @returns {boolean} - True if the position is an aisle, otherwise false.
   */
  const isAisle = (index) => index === Math.floor(columns.length / 2);

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
          />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default SeatRow;
