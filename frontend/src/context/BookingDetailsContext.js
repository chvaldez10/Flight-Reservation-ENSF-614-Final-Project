import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BookingDetailsContext = createContext();

export const useBookingDetails = () => useContext(BookingDetailsContext);

export const BookingDetailsProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    UserID: "", // Placeholder, update as per your application logic
    FlightID: null,
    SeatLetter: null,
    SeatNum: null,
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
      bookingDetails.FlightID ||
      bookingDetails.SeatLetter ||
      bookingDetails.SeatNum
    ) {
      submitBookingDetails();
    }
  }, [bookingDetails]);

  const submitBookingDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/passengers",
        bookingDetails
      );
      console.log(response.data);
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
