import React from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Seat component
const Seat = ({ seatNumber, seatClass, onSelect }) => {
  // Define styles based on the seat class
  const seatStyle = {
    business: { backgroundColor: "black", color: "white", margin: "2px" },
    comfort: { backgroundColor: "gray", color: "white", margin: "2px" },
    economy: { backgroundColor: "white", color: "black", margin: "2px" },
  };

  return (
    <Button
      variant="contained"
      style={seatStyle[seatClass]}
      onClick={() => onSelect(seatNumber)}
    >
      {seatNumber}
    </Button>
  );
};

// Seat Row component for larger screens
const SeatRow = ({ rowNum, columns, onSelect }) => {
  const getSeatClass = (columnLabel) => {
    if (["A", "B"].includes(columnLabel)) return "business";
    if (["C"].includes(columnLabel)) return "comfort";
    return "economy";
  };

  return (
    <Grid container item xs={12} justifyContent="center">
      {columns.map((columnLabel) => (
        <Seat
          key={`${columnLabel}${rowNum}`}
          seatNumber={`${columnLabel}${rowNum}`}
          seatClass={getSeatClass(columnLabel)}
          onSelect={onSelect}
        />
      ))}
    </Grid>
  );
};

// Seatmap component
const Seatmap = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = ["A", "B", "C", "D"];
  const numRows = 20;

  const handleSeatSelect = (seat) => {
    console.log(`Selected seat: ${seat}`);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        overflowX: "auto",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <Typography variant="h4" gutterBottom component="div">
        Seatmap
      </Typography>
      <Grid container direction={isSmallScreen ? "column" : "row"} spacing={2}>
        {Array.from(
          { length: isSmallScreen ? columns.length : numRows },
          (_, index) => (
            <SeatRow
              key={index}
              rowNum={index + 1}
              columns={
                isSmallScreen
                  ? [...Array(numRows).keys()].map((n) => n + 1)
                  : columns
              }
              onSelect={handleSeatSelect}
            />
          )
        )}
      </Grid>
    </Box>
  );
};

export default Seatmap;
