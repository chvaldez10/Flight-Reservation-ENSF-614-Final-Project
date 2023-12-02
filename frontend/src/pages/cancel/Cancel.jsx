import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Navbar from "../../components/navbar/NavbarComponent";

const Cancel = () => {
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!bookingId || !email) {
        console.error("Booking ID and Email are required");
        return;
      }

      const response = await fetch(
        `http://localhost:3001/api/passenger/${bookingId}/${email}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Booking canceled successfully");
        setShowSuccessPopup(true);
        setBookingId('');
        setEmail('');
      } else {
        console.error("Failed to cancel booking");
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "background.default",
        }}
      >
        <Box
          sx={{
            p: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "300px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4">Cancel Flight</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="bookingId"
              label="Booking ID"
              name="bookingId"
              autoFocus
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              sx={{ marginBottom: 0 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "black", opacity: 0.8 },
                mb: 2,
                mt: 1,
              }}
            >
              Cancel Booking
            </Button>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "gray",
                color: "white",
                "&:hover": { bgcolor: "black", opacity: 0.9 },
              }}
            >
              Back
            </Button>
          </form>

          {/* Snackbar for success */}
          <Snackbar
            open={showSuccessPopup}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Booking canceled successfully!
            </MuiAlert>
          </Snackbar>

          {/* Snackbar for error */}
          <Snackbar
            open={showErrorPopup}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Booking not found. Please check your Booking ID and Email.
            </MuiAlert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
};

export default Cancel;
