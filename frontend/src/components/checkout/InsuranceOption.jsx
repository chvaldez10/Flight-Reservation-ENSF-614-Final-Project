import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";

const InsuranceOption = ({ onInsuranceSelect }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
    onInsuranceSelect(event.target.value === "yes");
    console.log("Cancellation Protection selected:", event.target.value);
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "8px auto 0px auto",
      padding: "16px", // Or use a fixed unit instead of theme.spacing
      border: "1px solid black",
      borderRadius: "4px", // Or a fixed value instead of theme.shape.borderRadius
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    price: {
      color: "black",
      fontWeight: "bold",
    },
    details: {
      color: "black",
      margin: "16px 0", // Or a fixed unit instead of theme.spacing
    },
    radioGroup: {
      marginLeft: "16px", // Or a fixed unit instead of theme.spacing
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h6">
          CANCELLATION PROTECTION (RECOMMENDED)
        </Typography>
      </Box>
      <Box sx={styles.details}>
        <ShieldIcon color="action" />
        <Typography>
          Receive 100% refund for many reasons including:
          <ul>
            <li>Illness or injury</li>
            <li>Pre-existing medical condition</li>
            <li>Home emergency</li>
            <li>Transport failure</li>
          </ul>
        </Typography>
      </Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Do you want to add cancellation protection?
        </FormLabel>
        <RadioGroup
          row
          aria-label="cancellation protection"
          name="cancellation-protection"
          value={selected}
          onChange={handleChange}
          sx={styles.radioGroup}
        >
          <FormControlLabel
            value="yes"
            control={
              <Radio
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label="Yes, I want cancellation protection"
          />
          <FormControlLabel
            value="no"
            control={
              <Radio
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label="No thanks, I don’t need protection"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default InsuranceOption;
