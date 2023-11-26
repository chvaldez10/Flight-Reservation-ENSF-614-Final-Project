import { useRef, useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";

const formBoxStyle = {
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 3,
  borderRadius: 1,
  boxShadow: 3,
};

const inputFields = [
  { label: "User ID", state: "UserID", regex: /^[A-Za-z0-9-]+$/ },
  { label: "First Name", state: "FName", regex: /^[A-Za-z\s]+$/ },
  { label: "Last Name", state: "LName", regex: /^[A-Za-z\s]+$/ },
  {
    label: "Password",
    state: "Password",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  },
  { label: "Confirm Password", state: "confirmPassword" },
  { label: "Email", state: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  { label: "Phone", state: "Phone", regex: /^[0-9]{10}$/ },
  { label: "Address", state: "Address", regex: /^[A-Za-z0-9'\.\-\s\,]{5,}$/ },
];

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidation = () => {
    if (formData.Password !== formData.confirmPassword) {
      setErrMsg("Passwords do not match");
      return false;
    }

    for (const field of inputFields) {
      const { state, regex } = field;
      if (
        field.state !== "confirmPassword" &&
        formData[state] &&
        regex &&
        !regex.test(formData[state])
      ) {
        return false;
      }
    }
    return true;
  };

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
      console.log("Registration successful"); // debugging
      setSuccess(true);
      setFormData({});
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
                ? "password"
                : "text"
            }
            value={formData[field.state] || ""}
            onChange={handleChange}
            autoFocus={field.state === "UserID"}
            ref={field.state === "UserID" ? userRef : null}
          />
        ))}

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "black", opacity: 0.8 },
          }}
          onClick={handleSubmit}
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
