import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useAuth } from "./../../context/AuthContext";

import Navbar from "../../components/navbar/NavbarComponent";
import ManageRewardsForm from "./ManageRewardsForm";

import "./rewards.css";

const Rewards = () => {
  const [isRewardsMember, setIsRewardsMember] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [membershipFlag, setMembershipFlag] = useState(0);
  const [showManageRewardsForm, setShowManageRewardsForm] = useState(false);

  const authContext = useAuth();

  useEffect(() => {
    // Fetch MembershipFlag when the component mounts
    const fetchMembershipFlag = async () => {
      const userID = authContext.username;

      try {
        const response = await fetch(
          `http://localhost:3001/api/membership/${userID}`
        );
        const data = await response.json();

        if (response.ok) {
          setMembershipFlag(data.membershipFlag);

          // If MembershipFlag is 1, show the Manage Rewards form
          if (data.membershipFlag === 1) {
            setShowManageRewardsForm(true);
          }
        } else {
          console.error("Failed to fetch MembershipFlag:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMembershipFlag();
  }, [authContext.username]);

  console.log("showManageRewardsForm:", showManageRewardsForm);

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

        // If the MembershipFlag is updated to 1, show the Manage Rewards form
        if (membershipFlag === 0 && isRewardsMember) {
          setShowManageRewardsForm(true);
        }
      } else {
        console.error("Failed to update MembershipFlag:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessPopup(false);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" className="container">
        <Box className="box">
          <Typography variant="h4" mb={2}>
            {membershipFlag === 1 ? "Manage Rewards" : "Rewards Sign-Up"}
          </Typography>

          {membershipFlag !== 1 && (
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
                disabled={!isRewardsMember}
                style={{
                  backgroundColor: isRewardsMember ? "black" : "gray",
                  color: "white",
                  "&:hover": {
                    backgroundColor: isRewardsMember ? "black" : "gray",
                    opacity: 0.8,
                  },
                  marginBottom: "10px",
                  filter: isRewardsMember ? "none" : "grayscale(100%)",
                }}
              >
                Submit
              </Button>
            </form>
          )}

          {/* Conditionally render Manage Rewards form based on MembershipFlag */}
          {showManageRewardsForm && membershipFlag === 1 && (
            <ManageRewardsForm />
          )}

          {/* Snackbar for success */}
          <Snackbar
            open={showSuccessPopup}
            autoHideDuration={900}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="success"
            >
              Successfully signed up for Rewards!
            </MuiAlert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
};

export default Rewards;
