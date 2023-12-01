import React from "react";
import { Button } from "@mui/material";

const Seat = ({ seatNumber, seatClass, onSelect, isSelected }) => {
  const handleSelect = () => {
    onSelect(seatNumber);
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
      backgroundColor: "lightgray",
      color: "black",
    },
  };

  // Render an 'X' over the seat when selected
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
