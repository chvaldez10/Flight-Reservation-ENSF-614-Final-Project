import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SeatRow from "../../components/seatmap/SeatRow";
import Navbar from "../../components/navbar/NavbarComponent";
import { useBookingDetails } from "../../context/BookingDetailsContext";

/**
 * Seatmap component for displaying a seat selection interface.
 * Utilizes Material UI components and a custom SeatRow component.
 *
 * @component
 * @example
 * return (
 *   <Seatmap />
 * )
 */
const Seatmap = () => {
  // Theme and media query hook for responsive design.
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // State and context for handling seat selection.
  const numRows = 9;
  const { updateBookingDetail } = useBookingDetails();
  const [selectedSeat, setSelectedSeat] = useState(null);

  /**
   * Handles seat selection.
   * Updates the selected seat and booking details.
   *
   * @param {string} seat - The seat identifier to be selected or deselected.
   */
  const handleSeatSelect = (seat) => {
    if (seat === selectedSeat) {
      setSelectedSeat(null);
      updateBookingDetail("selectSeat", null);
    } else {
      setSelectedSeat(seat);
      updateBookingDetail("selectedSeat", seat);
    }
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
        <Button variant="contained" color="primary" fullWidth>
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default Seatmap;
