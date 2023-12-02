import React from "react";
import { Button } from "@mui/material";

const Seat = ({ seatNumber, seatClass, onSelect, isSelected, isAvailable }) => {
  const handleSelect = () => {
    if (isAvailable) {
      onSelect(seatNumber);
    }
  };

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
      opacity: isAvailable ? 1 : 0.5, // Lower opacity for unavailable seats
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
    unavailable: {
      backgroundColor: "lightgray", // Style for unavailable seats
      color: "darkgray",
      pointerEvents: "none", // Disables click events
    },
  };

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
        ...(isSelected
          ? seatStyle.selected
          : isAvailable
          ? seatStyle[seatClass]
          : seatStyle.unavailable),
      }}
      onClick={handleSelect}
      disabled={!isAvailable} // Disable the button for unavailable seats
    >
      {selectedOverlay}
      {seatNumber}
    </Button>
  );
};

export default Seat;
