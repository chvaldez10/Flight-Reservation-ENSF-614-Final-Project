import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Box, Button, Typography, ThemeProvider } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { theme } from "./../../components/checkout/theme";
import { boxStyles } from "./../../assets/styles/CheckoutStyles";
import CreditCard from "../../components/checkout/CreditCard";
import PassengerDetails from "../../components/checkout/PassengerDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";
import { useBookingDetails } from "../../context/BookingDetailsContext";
import { useLocalStorage } from "../../context/useLocalStorage";
import { SeatPricingContext } from "../../context/SeatPricingContext";

import Navbar from "../../components/navbar/NavbarComponent";

const Checkout = () => {
  const { bookingDetails, updateBookingDetails, submitBookingDetails } =
    useBookingDetails();

  const [username, setUsername] = useLocalStorage("username", "");

  const [showPassengerDetails, setShowPassengerDetails] = useState(false);

  const { selectedSeat, seatPrice, updateSeatPricing } =
    useContext(SeatPricingContext);

  const [totalPrice, setTotalPrice] = useState(seatPrice);

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmissionSuccess(false);
  };

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

  // check username for checkout
  const checkUsernameID = () => {
    if (username === "") {
      setShowPassengerDetails(true);
    } else {
      setShowPassengerDetails(false);
    }
  };

  useEffect(() => {
    checkUsernameID();
  }, [username]);

  useEffect(() => {
    setTotalPrice(seatPrice + (InsuranceFlag ? 25 : 0));
  }, [InsuranceFlag, seatPrice]);

  useEffect(() => {
    updateSeatPricing(selectedSeat, seatPrice);
  }, [selectedSeat, seatPrice, updateSeatPricing]);

  const handleInsuranceSelect = (isSelected) => setHasInsurance(isSelected);

  const handleCompletePayment = async () => {
    try {
      if (
        localPassengerInfo.FName &&
        localPassengerInfo.LName &&
        localPassengerInfo.Email
      ) {
        const submissionResult = await submitBookingDetails();
  
        if (submissionResult) {
          setSubmissionSuccess(true);

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          console.error("Submission not successful");
        }
      } else {
        alert("Please provide complete passenger details.");
      }
    } catch (error) {
      console.error("Error in handleCompletePayment:", error);
    }
  };

  const handlePassengerInfoChange = (key, value) =>
    setLocalPassengerInfo((prev) => ({ ...prev, [key]: value }));

  const handleCreditCardInfoChange = (key, value) =>
    setLocalCreditCardInfo((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box sx={boxStyles}>
          <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />

          <PassengerDetails
            passengerInfo={localPassengerInfo}
            onPassengerInfoChange={handlePassengerInfoChange}
          />
          <CreditCard
            creditCardInfo={localCreditCardInfo}
            onCreditCardInfoChange={handleCreditCardInfoChange}
          />
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCompletePayment}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "gray", opacity: 0.9 },
                  mb: 1,
                }}
              >
                Complete Payment
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Total Price: ${totalPrice}.00
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <Button
                component={Link}
                to="/flights"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "gray",
                  color: "white",
                  "&:hover": { bgcolor: "black", opacity: 0.9 },
                  mb: 1,
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            open={submissionSuccess}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="success"
            >
              Booking successful!
            </MuiAlert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Checkout;
