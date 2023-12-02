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
import { useLocalStorage } from "../../context/useLocalStorage";

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

  const handleInsuranceSelect = (isSelected) => setHasInsurance(isSelected);

  // update user info
  const handleCompletePayment = () => {
    updateBookingDetails({
      ...localBookingInfo,
      // ...localCreditCardInfo,
      InsuranceFlag,
    });

    submitBookingDetails();
  };

  // local changes for passenger info
  // const handlePassengerInfoChange = (key, value) => {
  //   setLocalPassengerInfo((prev) => ({ ...prev, [key]: value }));
  // };

  // local changes for passenger card
  const handleCreditCardInfoChange = (key, value) => {
    setLocalCreditCardInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={boxStyles}>
        <FlightDetails flightInfo={FLIGHT_INFO} />
        <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />
        {/* <PassengerDetails
          passengerInfo={localPassengerInfo}
          onPassengerInfoChange={handlePassengerInfoChange}
        /> */}
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
