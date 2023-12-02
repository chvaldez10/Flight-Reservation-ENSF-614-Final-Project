import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BookingDetailsContext = createContext();

export const useBookingDetails = () => useContext(BookingDetailsContext);

export const BookingDetailsProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    LName: "",
    FName: "",
    SeatLetter: null,
    SeatNum: null,
    FlightID: null,
    Email: "",
    InsuranceFlag: false,
  });

  const updateBookingDetail = (key, value) => {
    console.log(`Updating ${key} to`, value);
    setBookingDetails((prevDetails) => ({ ...prevDetails, [key]: value }));
  };

  const updateBookingDetails = (details) => {
    console.log("Updating booking details:", details);
    setBookingDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  useEffect(() => {
    // Conditional to prevent initial POST request
    if (
      bookingDetails.FlightID &&
      bookingDetails.SeatLetter &&
      bookingDetails.SeatNum &&
      bookingDetails.LName &&
      bookingDetails.FName &&
      bookingDetails.Email
    ) {
      submitBookingDetails();
    }
  }, [bookingDetails]);

  const submitBookingDetails = async () => {
    try {
      const { LName, FName, SeatLetter, SeatNum, FlightID, Email } =
        bookingDetails;
      const response = await axios.post("http://localhost:3001/api/passenger", {
        LName,
        FName,
        SeatLetter,
        SeatNum,
        FlightID,
        Email,
      });
      console.log("Booking Details Submitted:", response.data);
      // Handle the response here, e.g., storing BookingID if needed
    } catch (error) {
      console.error("Error submitting booking details:", error);
    }
  };

  return (
    <BookingDetailsContext.Provider
      value={{
        bookingDetails,
        updateBookingDetail,
        updateBookingDetails,
      }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
};
