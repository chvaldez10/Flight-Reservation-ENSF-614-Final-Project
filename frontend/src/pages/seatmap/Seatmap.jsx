import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SeatRow from "../../components/seatmap/SeatRow";
import Navbar from "../../components/navbar/NavbarComponent";
import { useBookingDetails } from "../../context/BookingDetailsContext";

const Seatmap = () => {
  // Theme and media query hook for responsive design.
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // State and context for handling seat selection.
  const numRows = 9;
  const { updateBookingDetail } = useBookingDetails();
  const [selectedSeat, setSelectedSeat] = useState(null);

  // navigate
  const navigate = useNavigate();

  const handleSeatSelect = (seat) => {
    const match = seat.match(/^([A-Za-z]+)(\d+)$/);

    if (match) {
      const seatLetter = match[1];
      const seatNumber = parseInt(match[2], 10);

      if (seat === selectedSeat) {
        setSelectedSeat(null);
        updateBookingDetail("SeatLetter", null);
        updateBookingDetail("SeatNum", null);
      } else {
        setSelectedSeat(seat);
        updateBookingDetail("SeatLetter", seatLetter);
        updateBookingDetail("SeatNum", seatNumber);
      }
    } else {
      console.error("Invalid seat format");
    }
  };

  const handleButtonClick = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <Navbar />
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
        <Grid
          container
          direction={isSmallScreen ? "column" : "row"}
          spacing={2}
        >
          {Array.from({ length: numRows }, (_, index) => (
            <SeatRow
              key={index}
              rowNum={index + 1}
              onSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
            />
          ))}
        </Grid>
        <Button
          variant="contained"
          style={{ backgroundColor: "#000", color: "white", margin: "32px" }}
          size="small"
          onClick={handleButtonClick}
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default Seatmap;
