import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: grey[200],
  },
  button: {
    marginTop: "20px",
    color: grey[900],
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: grey[100],
    },
  },
  input: {
    marginTop: "20px",
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Account Login
      </Typography>
      <TextField
        className={classes.input}
        label="User name"
        variant="outlined"
      />
      <TextField
        className={classes.input}
        label="Password"
        variant="outlined"
        type="password"
      />
      <Button className={classes.button} variant="contained">
        Sign In
      </Button>
      <Button className={classes.button} variant="contained">
        Register
      </Button>
    </Box>
  );
};

export default Login;
