import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const PassengerDetails = ({ onDetailsSubmit }) => {
  const [passengerDetails, setPassengerDetails] = useState({});

  const handleInputChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onDetailsSubmit(passengerDetails);
  };

  return (
    <Box>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        onChange={handleInputChange}
      />
      {/* Add other necessary fields like age, special requirements etc. */}
      <Button onClick={handleSubmit}>Add Passenger</Button>
    </Box>
  );
};

export default PassengerDetails;
