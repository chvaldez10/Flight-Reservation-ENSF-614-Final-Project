import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, maxLength, sx }) => {
  return (
    <TextField
      fullWidth
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
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = label)}
    />
  );
};

export default CustomTextField;
