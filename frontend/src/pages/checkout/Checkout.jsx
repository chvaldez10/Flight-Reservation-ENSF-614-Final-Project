import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Box, Button, Typography, ThemeProvider } from "@mui/material";

import { theme } from "./../../components/checkout/theme";
import { boxStyles } from "./../../assets/styles/CheckoutStyles";
import CreditCard from "../../components/checkout/CreditCard";
import PassengerDetails from "../../components/checkout/PassengerDetails";
import FlightDetails from "../../components/checkout/FlightDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";
import { useBookingDetails } from "../../context/BookingDetailsContext";
import { useLocalStorage } from "../../context/useLocalStorage";
import { SeatPricingContext } from "../../context/SeatPricingContext";

const FLIGHT_INFO = {
  origin: "Calgary",
  destination: "Edmonton",
  departureDate: "2023-11-26",
  departureTime: "8:20-9:21",
};

const Checkout = () => {
  const { bookingDetails, updateBookingDetails, submitBookingDetails } =
    useBookingDetails();
  const [username, setUsername] = useLocalStorage("username", "");
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  const { selectedSeat, seatPrice, updateSeatPricing } =
    useContext(SeatPricingContext);
  const [totalPrice, setTotalPrice] = useState(seatPrice);
  const [localPassengerInfo, setLocalPassengerInfo] = useState({
    FName: "",
    LName: "",
    Email: "",
  });
  const [localBookingInfo, setLocalBookingInfo] = useState({
    UserID: username,
    SeatLetter: bookingDetails.SeatLetter,
    SeatNum: bookingDetails.SeatNum,
    FlightID: bookingDetails.FlightID,
  });
  const [localCreditCardInfo, setLocalCreditCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [InsuranceFlag, setHasInsurance] = useState(false);

  useEffect(() => {
    setShowPassengerDetails(username !== "");
  }, [username]);

  useEffect(() => {
    setTotalPrice(seatPrice + (InsuranceFlag ? 25 : 0));
  }, [InsuranceFlag, seatPrice]);

  useEffect(() => {
    updateSeatPricing(selectedSeat, seatPrice);
  }, [selectedSeat, seatPrice, updateSeatPricing]);

  const handleInsuranceSelect = (isSelected) => setHasInsurance(isSelected);
  const handleCompletePayment = () => {
    updateBookingDetails({ ...localBookingInfo, InsuranceFlag });
    submitBookingDetails();
  };
  const handlePassengerInfoChange = (key, value) =>
    setLocalPassengerInfo((prev) => ({ ...prev, [key]: value }));
  const handleCreditCardInfoChange = (key, value) =>
    setLocalCreditCardInfo((prev) => ({ ...prev, [key]: value }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <FlightDetails flightInfo={FLIGHT_INFO} />
        <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />
        {showPassengerDetails && (
          <PassengerDetails
            passengerInfo={localPassengerInfo}
            onPassengerInfoChange={handlePassengerInfoChange}
          />
        )}
        <CreditCard
          creditCardInfo={localCreditCardInfo}
          onCreditCardInfoChange={handleCreditCardInfoChange}
        />
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCompletePayment}
            >
              Complete Payment
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography> ${totalPrice}</Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

Checkout.propTypes = {
  flightInfo: PropTypes.object.isRequired,
};

export default Checkout;
