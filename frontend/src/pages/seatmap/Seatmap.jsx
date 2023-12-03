import React, { useContext, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import SeatRow from "../../components/seatmap/SeatRow";
import Navbar from "../../components/navbar/NavbarComponent";

// Context
import { useBookingDetails } from "../../context/BookingDetailsContext";
import { SeatPricingContext } from "../../context/SeatPricingContext";

const Seatmap = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { bookingDetails, updateBookingDetail } = useBookingDetails();
  const { updateSeatPricing } = useContext(SeatPricingContext);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatLetter, setSeatLetter] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [flightID, setFlightID] = useState(bookingDetails.FlightID);

  const handleSeatSelect = (seat) => {
    const match = seat.match(/^([A-Za-z]+)(\d+)$/);
    if (!match) {
      console.error("Invalid seat format");
      return;
    }

    const [tmpSeatLetter, tmpSeatNumberStr] = match.slice(1);
    const tmpSeatNumber = parseInt(tmpSeatNumberStr, 10);

    setSeatLetter(tmpSeatLetter);
    setSeatNumber(tmpSeatNumber);

    const seatPrice =
      seatNumber === 1 ? 1000 : seatNumber >= 2 && seatNumber <= 3 ? 700 : 500;

    if (seat === selectedSeat) {
      setSelectedSeat(null);
      updateBookingDetail("SeatLetter", null);
      updateBookingDetail("SeatNum", null);
      updateSeatPricing(0, null);
      return;
    }

    setSelectedSeat(seat);
    updateBookingDetail("SeatLetter", tmpSeatLetter);
    updateBookingDetail("SeatNum", tmpSeatNumber);
    updateSeatPricing(seat, seatPrice);
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
        <Typography variant="h4" gutterBottom>
          Seatmap
        </Typography>
        <Grid
          container
          direction={isSmallScreen ? "column" : "row"}
          spacing={2}
        >
          {Array.from({ length: 9 }, (_, index) => (
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
          onClick={() => navigate("/checkout")}
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default Seatmap;
