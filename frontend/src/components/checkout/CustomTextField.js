import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, maxLength, sx, onChange, name, value }) => {
  // Handling change event
  const handleChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <TextField
      fullWidth
      name={name}
      value={value}
      sx={{ mb: 2, ...sx }}
      variant="outlined"
      placeholder={label}
      InputLabelProps={{
        shrink: false,
      }}
      InputProps={{
        notched: false,
        maxLength: maxLength,
      }}
      onChange={handleChange}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = label)}
    />
  );
};

export default CustomTextField;
