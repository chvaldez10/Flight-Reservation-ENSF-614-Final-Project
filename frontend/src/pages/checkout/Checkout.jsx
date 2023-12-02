import React, { useState } from "react";
import { Box, Button, ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";
import { theme } from "./../../components/checkout/theme";
import { boxStyles } from "./../../assets/styles/CheckoutStyles";
import CreditCard from "../../components/checkout/CreditCard";
import PassengerDetails from "../../components/checkout/PassengerDetails";
import FlightDetails from "../../components/checkout/FlightDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";
import { useBookingDetails } from "../../context/BookingDetailsContext";

const FLIGHT_INFO = {
  origin: "Calgary",
  destination: "Edmonton",
  departureDate: "2023-11-26",
  departureTime: "8:20-9:21",
};

const Checkout = () => {
  const [localPassengerInfo, setLocalPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [localCreditCardInfo, setLocalCreditCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [hasInsurance, setHasInsurance] = useState(false);
  const { bookingDetails, updateBookingDetails } = useBookingDetails();

  const handleInsuranceSelect = (isSelected) => setHasInsurance(isSelected);

  // update user info
  const handleCompletePayment = () => {
    updateBookingDetails({
      ...localPassengerInfo,
      ...localCreditCardInfo,
      hasInsurance,
    });
  };

  // local changes for passenger info
  const handlePassengerInfoChange = (key, value) => {
    setLocalPassengerInfo((prev) => ({ ...prev, [key]: value }));
  };

  // local changes for passenger card
  const handleCreditCardInfoChange = (key, value) => {
    setLocalCreditCardInfo((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <FlightDetails flightInfo={FLIGHT_INFO} />
        <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />
        <PassengerDetails
          passengerInfo={localPassengerInfo}
          onPassengerInfoChange={handlePassengerInfoChange}
        />
        <CreditCard
          creditCardInfo={localCreditCardInfo}
          onCreditCardInfoChange={handleCreditCardInfoChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCompletePayment}
        >
          Complete Payment
        </Button>
      </Box>
    </ThemeProvider>
  );
};

Checkout.propTypes = {
  flightInfo: PropTypes.object.isRequired,
};

export default Checkout;
