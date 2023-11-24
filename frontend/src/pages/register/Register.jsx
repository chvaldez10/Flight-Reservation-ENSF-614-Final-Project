import { useRef, useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Container,
} from "@mui/material";

// Custom Text Field to reduce repetition
const CustomTextField = ({ label, type = "text" }) => (
  <TextField
    label={label}
    type={type}
    variant="outlined"
    fullWidth
    margin="normal"
  />
);

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

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
const PHONE_REGEX = /^[0-9]{10}$/; // Regex for a 10-digit phone number
const ADDRESS_REGEX = /^[A-Za-z0-9'\.\-\s\,]{5,}$/; // Basic address regex, adjust as needed

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidAddress(ADDRESS_REGEX.test(address));
  }, [address]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email, phone, address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PHONE_REGEX.test(phone);
    const v5 = ADDRESS_REGEX.test(address);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    // Simulate a successful registration
    console.log("Submitted:", { user, pwd, email, phone, address });
    setSuccess(true);
    // Clear state and controlled inputs
    setUser("");
    setPwd("");
    setMatchPwd("");
    setEmail("");
    setPhone("");
    setAddress("");
    // Reset error message
    setErrMsg("");
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
        {/* Display error message */}
        {errMsg && (
          <Typography color="error" ref={errRef}>
            {errMsg}
          </Typography>
        )}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          autoFocus
          ref={userRef}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          type="password"
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* Disable button if not all validations are passed */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "black", opacity: 0.8 },
          }}
          onClick={handleSubmit}
          disabled={
            !validName ||
            !validPwd ||
            !validMatch ||
            !validEmail ||
            !validPhone ||
            !validAddress
          }
        >
          Register
        </Button>
        {/* Success message or redirection logic after successful registration */}
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
