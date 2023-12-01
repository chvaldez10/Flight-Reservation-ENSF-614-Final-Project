import React, { useState } from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import SeatRow from "../../components/seatmap/SeatRow";
// import { useBookingDetail } from "../../context/BookingDetailsContext";

const Seatmap = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const numRows = 9;
  // const updateBookingDetail = useBookingDetail();
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelect = (seat) => {
    if (seat === selectedSeat) {
      setSelectedSeat(null);
      // updateBookingDetail("selectSeat", null);
    } else {
      setSelectedSeat(seat);
      // updateBookingDetail("selectedSeat", seat);
    }
    console.log(`Select seat: ${seat}`);
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
        {Array.from({ length: numRows }, (_, index) => (
          <SeatRow
            key={index}
            rowNum={index + 1}
            onSelect={handleSeatSelect}
            selectedSeat={selectedSeat}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Seatmap;
