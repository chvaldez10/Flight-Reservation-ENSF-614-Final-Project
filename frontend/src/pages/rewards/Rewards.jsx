import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Checkbox,
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Snackbar,
} from "@mui/material";

import { useAuth } from "./../../context/AuthContext";

import Navbar from "../../components/navbar/NavbarComponent";

const Rewards = () => {
  const [isRewardsMember, setIsRewardsMember] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const authContext = useAuth();

  const handleCheckboxChange = (event) => {
    setIsRewardsMember(event.target.checked);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userID = authContext.username;

    if (!userID) {
      console.error("User ID not found in the authentication context.");
      // Handle the case where user ID is not available.
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/membership/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MembershipFlag: 1,
          }),
        }
      );

      if (response.ok) {
        console.log("MembershipFlag updated successfully");
        // Set the state to show the success popup
        setShowSuccessPopup(true);
      } else {
        console.error("Failed to update MembershipFlag:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSnackbarClose = () => {
    setShowSuccessPopup(false);
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
            maxWidth: "400px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" mb={2}>
            Rewards Sign-Up
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRewardsMember}
                    onChange={handleCheckboxChange}
                    name="rewardsMember"
                    color="primary"
                  />
                }
                label="Sign up to be a Rewards Member"
              />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "black", opacity: 0.8 },
                mt: 2,
              }}
              disabled={!isRewardsMember}
            >
              Submit
            </Button>
          </form>
          {/* Snackbar for success */}
          <Snackbar
            open={showSuccessPopup}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Successfully signed up for Rewards!"
          />
        </Box>
      </Container>
    </>
  );
};

export default Rewards;
