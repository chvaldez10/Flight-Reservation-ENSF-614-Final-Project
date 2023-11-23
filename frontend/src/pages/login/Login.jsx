import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { Button, TextField, Box, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  if (!authContext) {
    // Consider a better error handling approach here
    return <div>Authentication service unavailable</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginSuccess = authContext.login(username, password);
    setShowErrorMessage(!loginSuccess);
  };

  const textFieldStyle = { mb: 2 };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
      }}
    >
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>
        {showErrorMessage && (
          <Box sx={{ color: "red", mb: 2 }}>
            Authentication Failed. Please check your credentials.
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            sx={textFieldStyle}
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
          <TextField
            sx={textFieldStyle}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <Button
            type="submit"
            sx={{
              mb: 1,
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "black", opacity: 0.8 },
            }}
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </form>
        <Button
          component={RouterLink}
          to="/register"
          sx={{
            bgcolor: "white",
            color: "black",
            "&:hover": { bgcolor: "white", opacity: 0.8 },
          }}
          variant="contained"
          fullWidth
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
