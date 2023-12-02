import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";

const styles = {
  container: {
    maxWidth: "500px",
    margin: "8px auto 0px auto",
    padding: "16px",
    border: "1px solid black",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  radioGroup: {
    marginLeft: "16px",
  },
  radio: {
    color: "black",
    "&.Mui-checked": {
      color: "black",
    },
  },
};

const InsuranceOption = ({ onInsuranceSelect }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
  };

  const handleBlur = () => {
    // Only trigger the callback if the value has changed and is not an empty string
    if (selected !== "") {
      onInsuranceSelect(selected === "yes");
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h6" mb={2}>
        CANCELLATION PROTECTION (RECOMMENDED)
      </Typography>
      <Typography mb={2}>
        Receive 100% refund for many reasons including:
        <ul>
          <li>Illness or injury</li>
          <li>Pre-existing medical condition</li>
          <li>Home emergency</li>
          <li>Transport failure</li>
        </ul>
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="cancellation protection"
          name="cancellation-protection"
          value={selected}
          onChange={handleChange}
          onBlur={handleBlur}
          sx={styles.radioGroup}
        >
          <FormControlLabel
            value="yes"
            control={<Radio sx={styles.radio} />}
            label="Yes, I want cancellation protection"
          />
          <FormControlLabel
            value="no"
            control={<Radio sx={styles.radio} />}
            label="YOLO 😈"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default InsuranceOption;
