// Importing React (optional in newer versions of React)
import React from "react";

// Importing Navbar and Header components for use in the Home component
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

// Importing the stylesheet specific to the Home component
import "./home.css";

// Home component that serves as the main page of the application
const Home = () => {
  return (
    // Container div for the Home component
    <div>
      {/* Navbar component, representing the navigation bar */}
      <Navbar />

      {/* Header component, representing the header section */}
      <Header />
    </div>
  );
};

// Exporting the Home component for use in other parts of the application
export default Home;
