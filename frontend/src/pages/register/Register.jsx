import { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Container,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useAuth } from "./../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formBoxStyle, inputFields } from "./formConfig";

const Register = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // Update form validity whenever formData changes
    setIsFormValid(handleValidation());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidation = useCallback(() => {
    let isValid = true;

    if (formData.Password !== formData.confirmPassword) {
      setErrMsg("Passwords do not match");
      isValid = false;
    } else {
      setErrMsg("");
    }

    for (const field of inputFields) {
      const { state, regex } = field;
      if (
        field.state !== "confirmPassword" &&
        formData[state] &&
        regex &&
        !regex.test(formData[state])
      ) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [formData]);

  useEffect(() => {
    setIsFormValid(handleValidation());
  }, [formData, handleValidation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    const apiData = {
      UserID: formData.UserID,
      FName: formData.FName,
      LName: formData.LName,
      email: formData.email,
      Phone: formData.Phone,
      Address: formData.Address,
      Password: formData.Password,
    };

    try {
      await axios.post("http://localhost:3001/api/register", apiData);
      console.log("Registration successful");
      setSuccess(true);
      setFormData({});

      const loginSuccess = await authContext.login(
        formData.UserID,
        formData.Password
      );

      if (loginSuccess) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setErrMsg("Registration Failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={formBoxStyle}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign up
        </Typography>
        {errMsg && (
          <Typography color="error" ref={errRef}>
            {errMsg}
          </Typography>
        )}

        {inputFields.map((field) => (
          <TextField
            key={field.label}
            label={field.label}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            name={field.state}
            type={
              field.state === "Password" || field.state === "confirmPassword"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            value={formData[field.state] || ""}
            onChange={handleChange}
            autoFocus={field.state === "UserID"}
            ref={field.state === "UserID" ? userRef : null}
            InputProps={{
              endAdornment:
                field.state === "Password" ? (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ height: "100%" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ) : null,
            }}
          />
        ))}

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: isFormValid ? "black" : "lightgrey",
            color: isFormValid ? "white" : "black",
            "&:hover": {
              bgcolor: isFormValid ? "black" : "lightgrey",
              opacity: isFormValid ? 0.8 : 1,
            },
          }}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Register
        </Button>

        {success && (
          <Typography color="primary">Registration Successful!</Typography>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
