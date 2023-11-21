import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CounterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0", // Adjust padding to match the visual style
});

const CounterButton = styled(IconButton)({
  padding: "0", // Remove padding to reduce button size
});

const CounterTextField = styled(TextField)({
  width: "40px", // Adjust width to match the image
  "& .MuiInputBase-input": {
    textAlign: "center",
    padding: "6px", // Adjust padding to match the image
  },
});

/**
 * Counter component for adults and children selection.
 */
const PassengerCounter = ({ label, count, setCount }) => (
  <CounterBox>
    <Typography variant="subtitle1">{label}</Typography>
    <Box>
      <CounterButton onClick={() => setCount(Math.max(count - 1, 0))}>
        <RemoveIcon />
      </CounterButton>
      <CounterTextField
        size="small"
        value={count}
        inputProps={{ readOnly: true }}
      />
      <CounterButton onClick={() => setCount(count + 1)}>
        <AddIcon />
      </CounterButton>
    </Box>
  </CounterBox>
);

/**
 * SelectPassengers component for selecting the number of adults and children.
 */
const SelectPassengers = ({
  onClose,
  open,
  adults,
  setAdults,
  children,
  setChildren,
}) => (
  <Dialog
    onClose={onClose}
    open={open}
    aria-labelledby="select-guests-dialog-title"
  >
    <DialogTitle id="select-guests-dialog-title">Select Passengers</DialogTitle>
    <DialogContent>
      <PassengerCounter label="Adults" count={adults} setCount={setAdults} />
      <PassengerCounter
        label="Children"
        count={children}
        setCount={setChildren}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="contained">
        Done
      </Button>
    </DialogActions>
  </Dialog>
);

SelectPassengers.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  adults: PropTypes.number.isRequired,
  setAdults: PropTypes.func.isRequired,
  children: PropTypes.number.isRequired,
  setChildren: PropTypes.func.isRequired,
};

export default SelectPassengers;
