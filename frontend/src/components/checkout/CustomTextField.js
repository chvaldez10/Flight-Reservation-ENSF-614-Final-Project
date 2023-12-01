import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, maxLength, sx, onChange, name, value }) => {
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
      onChange={onChange}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = label)}
    />
  );
};

export default CustomTextField;
