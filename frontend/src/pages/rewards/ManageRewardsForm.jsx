import React, { useState } from "react";
import {
  Button,
  Grid,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./rewards.css"

const ManageRewardsForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarMessage("");
  };

  const handleCreditCardSignup = () => {
    setSnackbarMessage("Successfully signed up for the Credit Card!");
  };

  const handleLoungeAccessRequest = () => {
    setSnackbarMessage("Successfully requested Lounge Access!");
  };

  const handleNewsletterSubscription = () => {
    setSnackbarMessage("Successfully subscribed to the Monthly Newsletter!");
  };

  const handleCompanionVoucherRequest = () => {
    setSnackbarMessage("Successfully requested the Companion Voucher!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Buttons with different Snackbar messages */}
          <Button
            fullWidth
            variant="contained"
            className="button"
            onClick={handleCreditCardSignup}
          >
            Sign up for Credit Card
          </Button>

          <Button
            fullWidth
            variant="contained"
            className="button"
            onClick={handleLoungeAccessRequest}
          >
            Get Lounge Access
          </Button>

          <Button
            fullWidth
            variant="contained"
            className="button"
            onClick={handleNewsletterSubscription}
          >
            Subscribe to Newsletter
          </Button>

          <Button
            fullWidth
            variant="contained"
            className="button"
            onClick={handleCompanionVoucherRequest}
          >
            Get Companion Voucher
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for success */}
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default ManageRewardsForm;
