import React from "react";
import { Button } from "@mui/material";

/**
 * Seat component for displaying an individual seat.
 * Represents a clickable seat with distinct styles based on its class and selection state.
 *
 * @component
 * @example
 * const seatNumber = "A1";
 * const seatClass = "economy";
 * const onSelect = () => console.log("Seat selected");
 * const isSelected = false;
 * return (
 *   <Seat
 *     seatNumber={seatNumber}
 *     seatClass={seatClass}
 *     onSelect={onSelect}
 *     isSelected={isSelected}
 *   />
 * )
 *
 * @param {string} seatNumber - The identifier for the seat.
 * @param {string} seatClass - The class of the seat ('business', 'comfort', or 'economy').
 * @param {function} onSelect - Callback function to handle seat selection.
 * @param {boolean} isSelected - Indicates if the seat is selected.
 */
const Seat = ({ seatNumber, seatClass, onSelect, isSelected }) => {
  /**
   * Calls the onSelect function with the seat number.
   */
  const handleSelect = () => {
    onSelect(seatNumber);
  };

  // Style definitions for different seat states and classes.
  const seatStyle = {
    base: {
      margin: "0px 1px",
      minWidth: "25px",
      minHeight: "25px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.75rem",
      lineHeight: "normal",
      position: "relative",
    },
    selected: {
      backgroundColor: "gray",
    },
    business: {
      backgroundColor: "black",
      color: "gold",
    },
    comfort: {
      backgroundColor: "silver",
      color: "black",
    },
    economy: {
      backgroundColor: "white",
      color: "black",
    },
  };

  // Overlay for indicating selection.
  const selectedOverlay = isSelected ? (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1rem",
        color: "white",
      }}
    >
      X
    </div>
  ) : null;

  return (
    <Button
      variant="contained"
      style={{
        ...seatStyle.base,
        ...(isSelected ? seatStyle.selected : seatStyle[seatClass]),
      }}
      onClick={handleSelect}
    >
      {selectedOverlay}
      {seatNumber}
    </Button>
  );
};

export default Seat;
