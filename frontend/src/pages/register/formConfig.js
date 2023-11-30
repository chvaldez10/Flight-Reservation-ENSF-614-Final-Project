export const formBoxStyle = {
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 3,
  borderRadius: 1,
  boxShadow: 3,
};

export const inputFields = [
  { label: "User ID", state: "UserID", regex: /^[A-Za-z0-9-]+$/ },
  {
    label: "Password",
    state: "Password",
    // regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  },
  { label: "Confirm Password", state: "confirmPassword" },
  { label: "First Name", state: "FName", regex: /^[A-Za-z\s]+$/ },
  { label: "Last Name", state: "LName", regex: /^[A-Za-z\s]+$/ },
  { label: "Email", state: "email", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  // { label: "Phone", state: "Phone", regex: /^[0-9]{10}$/ },
  // { label: "Address", state: "Address", regex: /^[A-Za-z0-9'\.\-\s\,]{5,}$/ },
];
