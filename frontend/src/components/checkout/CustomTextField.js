import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, maxLength, placeholder, sx }) => {
  return (
    <TextField
      fullWidth
      sx={{ mb: 2, ...sx }}
      label={label}
      variant="outlined"
      inputProps={{ maxLength, placeholder }}
    />
  );
};

export default CustomTextField;
