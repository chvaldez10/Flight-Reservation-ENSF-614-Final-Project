import React, { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const InsuranceOption = ({ onInsuranceSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleChange = (event) => {
    setSelected(event.target.checked);
    onInsuranceSelect(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={selected} onChange={handleChange} />}
      label="Add Cancellation Insurance"
    />
  );
};

export default InsuranceOption;
