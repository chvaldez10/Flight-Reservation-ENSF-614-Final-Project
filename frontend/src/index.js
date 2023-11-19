// Importing necessary React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";

// Importing the main App component
import App from "./App.jsx";

// Importing Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";

// Selecting the root element in the HTML to mount our React application
const rootElement = document.getElementById("root");

// Creating the root for React application and rendering the App component
// StrictMode is used for highlighting potential problems in an application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
